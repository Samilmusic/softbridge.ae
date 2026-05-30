// Single source of truth for the internal/admin email address
// that receives notifications for every form submission.
// Override via SOFTBRIDGE_NOTIFY_EMAIL env var if needed.
export const ADMIN_NOTIFY_EMAIL =
  process.env.SOFTBRIDGE_NOTIFY_EMAIL || "softbridgefzco@yahoo.com";
