import { requireServerUser } from "@/lib/server-auth";
import { ProfileSettingsForm } from "@/components/profile-settings-form";

const notificationOptions = [
  {
    id: "critical-alerts",
    title: "Critical alerts",
    description:
      "Receive instant notifications for critical incidents and escalations.",
    defaultChecked: true,
  },
  {
    id: "weekly-digest",
    title: "Weekly digest",
    description:
      "Summary of investigations, compliance reminders, and SLA performance.",
    defaultChecked: true,
  },
  {
    id: "maintenance",
    title: "Maintenance updates",
    description: "Planned maintenance windows and platform release notes.",
    defaultChecked: false,
  },
];

export default async function ProfileSettingsPage() {
  const { user, profile } = await requireServerUser();
  const baseUrl = process.env.FRAPPE_BASE_URL ?? "";
  const initialAvatar = profile?.profile_image
    ? baseUrl
      ? new URL(profile.profile_image, baseUrl).toString()
      : profile.profile_image
    : user?.user_image ?? "";

  return (
    <ProfileSettingsForm
      user={user}
      profile={profile}
      notificationOptions={notificationOptions}
      baseUrl={baseUrl}
      initialAvatar={initialAvatar}
    />
  );
}
