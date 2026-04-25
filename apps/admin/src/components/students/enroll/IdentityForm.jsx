import { UserPlus } from "lucide-react";

const COURSES = [
  "OJT (Full Stack Development)",
  "OJT (Advanced Digital Marketing)",
  "OJD (Bachelor of Computer Applications)",
  "OJD (Bachelor of Business Administration)",
];

export function IdentityForm({ formData, setFormData }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold border-b border-border pb-2 text-foreground flex items-center gap-2">
        <UserPlus className="w-4 h-4 text-primary" />
        Identity Details
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Full Name</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
            className="input"
            placeholder="e.g. Aditi Patil"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Course</label>
          <select
            value={formData.course}
            onChange={e => setFormData({ ...formData, course: e.target.value })}
            className="input"
          >
            <option value="">Select a course</option>
            {COURSES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground mt-1.5">Course selection is not saved yet — pending backend support.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Phone Number</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="input"
              placeholder="10-digit mobile number"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="input"
              placeholder="student@example.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
