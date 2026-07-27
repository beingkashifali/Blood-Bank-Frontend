import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  Building2,
  Search,
  PlusCircle,
  ListChecks,
  Phone,
  MapPin,
  X,
} from "lucide-react";
import DashboardShell from "../../components/DashboardShell";
import Loader from "../../components/Loader";
import { BloodGroupBadge, AvailabilityPill } from "../../components/Badges";
import api from "../../api/axios";

const navItems = [
  { to: "/hospital/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/hospital/profile", label: "Hospital Profile", icon: Building2 },
  { to: "/hospital/search", label: "Search Donors", icon: Search },
  { to: "/hospital/create-request", label: "New Request", icon: PlusCircle },
  { to: "/hospital/requests", label: "All Requests", icon: ListChecks },
];

const SearchDonors = () => {
  const [city, setCity] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  // Loads every registered donor. Hospitals should be able to see the full
  // donor pool by default; the city field below just narrows this list.
  const fetchDonors = async (cityFilter = "") => {
    setLoading(true);
    try {
      const params = {};
      if (cityFilter.trim()) params.city = cityFilter.trim();

      const { data } = await api.get("/donors/search", { params });
      setDonors(data.donors);
    } catch (error) {
      toast.error("Could not load donors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the full donor list once when the page loads
  useEffect(() => {
    fetchDonors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDonors(city);
  };

  const handleClear = () => {
    setCity("");
    fetchDonors();
  };

  const resultsLabel = useMemo(() => {
    if (loading) return "";
    return `${donors.length} donor${donors.length === 1 ? "" : "s"}${
      city.trim() ? ` in "${city.trim()}"` : ""
    }`;
  }, [donors, city, loading]);

  return (
    <DashboardShell navItems={navItems} title="Search Donors">
      <form
        onSubmit={handleSearch}
        className="card mb-6 flex flex-col gap-4 p-6 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="label-field">City</label>
          <input
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-field"
            placeholder="Search by city, e.g. Lahore"
          />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="btn-primary !py-2.5">
            <Search size={16} /> Search
          </button>
          {city && (
            <button
              type="button"
              onClick={handleClear}
              className="btn-secondary !py-2.5"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {!loading && (
        <p className="mb-4 text-sm font-medium text-ink-500">{resultsLabel}</p>
      )}

      {loading ? (
        <Loader full />
      ) : donors.length === 0 ? (
        <div className="card p-14 text-center text-sm text-ink-500">
          {city
            ? `No donors found in "${city}". Try a different city.`
            : "No donors are registered yet."}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {donors.map((d) => (
            <button
              key={d._id}
              onClick={() => setSelected(d)}
              className="card p-5 text-left transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <BloodGroupBadge group={d.bloodGroup} />
                <AvailabilityPill available={d.isAvailable} />
              </div>
              <p className="mt-3 font-display font-semibold text-navy-900">
                {d.fullName}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
                <MapPin size={14} /> {d.area}, {d.city}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* Donor detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5"
          onClick={() => setSelected(null)}
        >
          <div
            className="card w-full max-w-sm p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <BloodGroupBadge group={selected.bloodGroup} size="lg" />
              <button
                onClick={() => setSelected(null)}
                className="text-ink-500"
              >
                <X size={20} />
              </button>
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-navy-900">
              {selected.fullName}
            </h3>
            <div className="mt-1">
              <AvailabilityPill available={selected.isAvailable} />
            </div>
            <div className="mt-5 space-y-3 text-sm text-ink-700">
              <p className="flex items-center gap-2">
                <MapPin size={15} className="text-ink-500" /> {selected.area},{" "}
                {selected.city}
              </p>
              <p>
                Gender: {selected.gender} · Age: {selected.age}
              </p>
            </div>
            <a
              href={`tel:${selected.phone}`}
              className="btn-primary mt-6 w-full"
            >
              <Phone size={16} /> Call {selected.phone}
            </a>
          </div>
        </div>
      )}
    </DashboardShell>
  );
};

export default SearchDonors;
