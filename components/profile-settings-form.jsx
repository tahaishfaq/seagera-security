"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchWithAuth } from "@/lib/fetch-with-auth";
import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/stores/auth-store";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const PLACEHOLDER_BASE = "https://placeholder.local/";

export function ProfileSettingsForm({ user, profile, notificationOptions, baseUrl, initialAvatar }) {
  const {
    authenticated,
    user: authUser,
    roles,
    profile: authProfile,
  } = useAuth();
  const setSession = useAuthStore((state) => state.setSession);
  const { toast } = useToast();

  const resolveAvatar = (value) => {
    if (!value) return "";
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return value;
    }
    if (!baseUrl) {
      return value;
    }
    try {
      return new URL(value, baseUrl).toString();
    } catch {
      return value;
    }
  };

  const [form, setForm] = useState({
    profileId: profile?.name ?? "",
    customer_name:
      profile?.customer_name ?? user?.full_name ?? user?.name ?? "",
    company_name: profile?.company_name ?? "",
    email: user?.email ?? profile?.email ?? "",
    phone: profile?.phone ?? "",
    address: profile?.address ?? "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPayload, setAvatarPayload] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    initialAvatar ? resolveAvatar(initialAvatar) : resolveAvatar(profile?.profile_image) || resolveAvatar(user?.user_image)
  );
  const [saving, setSaving] = useState(false);

  const currentUser = useMemo(() => authUser ?? user, [authUser, user]);
  const currentRoles = useMemo(() => roles ?? ["Portal Customer"], [roles]);

  useEffect(() => {
    if (!avatarFile) {
      return;
    }

    const previewUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [avatarFile]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) {
      setAvatarFile(null);
      setAvatarPayload(null);
      return;
    }
    setAvatarFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setAvatarPayload({
          data: result,
          filename: file.name,
          type: file.type,
        });
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      const response = await fetchWithAuth("/api/profile", {
        method: "POST",
        body: JSON.stringify({
          profileId: form.profileId,
          customer_name: form.customer_name,
          company_name: form.company_name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          profile_image: avatarPayload,
        }),
      });

      const updatedProfile = response?.profile ?? null;
      const normalizedProfile = updatedProfile
        ? {
            ...updatedProfile,
            profile_image: resolveAvatar(updatedProfile.profile_image),
          }
        : null;

      setSession({
        authenticated: authenticated ?? true,
        user: currentUser,
        profile: normalizedProfile,
        roles: currentRoles,
      });

      if (normalizedProfile?.profile_image) {
        setAvatarPreview(normalizedProfile.profile_image);
      }

      toast({
        title: "Profile updated",
        description: "Your profile details have been saved successfully.",
      });
    } catch (error) {
      console.error("Profile update failed", error);
      toast({
        title: "Profile update failed",
        description:
          error instanceof Error
            ? error.message
            : "Unable to update your profile.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <header className="space-y-2">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground">
          Profile & Preferences
        </h1>
        <p className="text-base text-muted-foreground">
          Manage the details your team uses to contact you and how you prefer to
          receive notifications.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="rounded-3xl border border-border">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl">Account Information</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Update your personal details and contact information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="profile_image">Profile image</Label>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
                  {avatarPreview ? (
                    <Image
                      width={64}
                      height={64}
                      src={avatarPreview}
                      alt={form.customer_name || "Profile avatar"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No image
                    </span>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Input
                    id="profile_image"
                    name="profile_image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG up to 5MB.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customer_name">Full name</Label>
                <Input
                  id="customer_name"
                  name="customer_name"
                  value={form.customer_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 010-0000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_name">Company</Label>
                <Input
                  id="company_name"
                  name="company_name"
                  placeholder="Company name"
                  value={form.company_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                rows={4}
                placeholder="Customer address on file"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <Separator />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <p className="text-xs text-muted-foreground sm:flex-1">
                These changes are saved to your Frappe customer profile. We
                recommend keeping contact details current to avoid missing
                urgent alerts.
              </p>
              <Button
                type="submit"
                size="lg"
                className="rounded-full px-6"
                disabled={saving}
              >
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-border">
          <CardHeader className="space-y-2">
            <CardTitle className="text-lg">Security</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Review account protections and session controls.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Multi-factor authentication
              </p>
              <p className="text-xs text-muted-foreground">
                Last verified 14 days ago. We recommend re-validating quarterly.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full justify-center rounded-full"
            >
              Manage two-factor authentication
            </Button>

            <Separator />

            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Active sessions
              </p>
              <p className="text-xs text-muted-foreground">
                Sign out from unused devices to reduce attack surface.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full justify-center rounded-full"
            >
              View active sessions
            </Button>

            <Separator />

            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">API tokens</p>
              <p className="text-xs text-muted-foreground">
                Rotate automation tokens regularly and disable any that are
                unused.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full justify-center rounded-full"
            >
              Manage API tokens
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-3xl border border-border">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl">Notification Preferences</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Choose how SentinelSphere keeps you informed about activity in your
            environment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-muted/20 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {option.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {option.description}
                </p>
              </div>
              <Checkbox id={option.id} defaultChecked={option.defaultChecked} />
            </div>
          ))}
          <div className="flex items-center justify-end">
            <Button size="lg" className="rounded-full px-6" type="button">
              Update preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
