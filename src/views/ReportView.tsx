import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { LoaderCircle, MapPin, Upload } from "lucide-react";
import { categorizeChallenge, type ChallengeCategory } from "@/lib/geminiAI";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ReportView() {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ChallengeCategory | "">("");
  const [photoName, setPhotoName] = useState("");
  const [locationText, setLocationText] = useState("");
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isCategorizing, setIsCategorizing] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  async function handleDescriptionBlur() {
    if (!description.trim()) {
      setCategory("");
      return;
    }

    setIsCategorizing(true);
    setFormMessage(null);
    try {
      const result = await categorizeChallenge(description);
      setCategory(result.category);
    } catch (error) {
      setFormMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Unable to assign a category.",
      });
    } finally {
      setIsCategorizing(false);
    }
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPhotoName(file?.name ?? "");
  }

  function handleGetLocation() {
    if (!navigator.geolocation) {
      setFormMessage({
        type: "error",
        text: "Location services are not available in this browser.",
      });
      return;
    }

    setIsLocating(true);
    setFormMessage(null);
    navigator.geolocation.getCurrentPosition(
      ({ coords: currentCoords }) => {
        setCoordinates({
          latitude: currentCoords.latitude,
          longitude: currentCoords.longitude,
        });
        setLocationText("Current location captured");
        setIsLocating(false);
      },
      () => {
        setFormMessage({
          type: "error",
          text: "We couldn't access your location. Check your browser permissions and try again.",
        });
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormMessage(null);

    if (!title.trim() || !description.trim()) {
      setFormMessage({ type: "error", text: "Add an issue title and detailed description first." });
      return;
    }

    if (!category) {
      setFormMessage({
        type: "error",
        text: "Click outside the description field to assign a category before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from("challenges").insert({
      title: title.trim(),
      description: description.trim(),
      category,
      status: "open",
      location_text: locationText || null,
      latitude: coordinates?.latitude ?? null,
      longitude: coordinates?.longitude ?? null,
      media_url: photoName || null,
    });
    setIsSubmitting(false);

    if (error) {
      setFormMessage({ type: "error", text: "We couldn't submit your report. Please try again." });
      return;
    }

    setTitle("");
    setDescription("");
    setCategory("");
    setPhotoName("");
    setLocationText("");
    setCoordinates(null);
    setFormMessage({ type: "success", text: "Your issue has been reported to the community." });
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-5 py-8 sm:py-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">New report</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Help improve your community.
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Share a local issue and we will route it to the right civic category.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7"
      >
        <div className="space-y-2">
          <label htmlFor="issue-title" className="text-sm font-semibold text-foreground">
            Issue Title
          </label>
          <Input
            id="issue-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Broken streetlight near the library"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="issue-description" className="text-sm font-semibold text-foreground">
            Detailed Description
          </label>
          <Textarea
            id="issue-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            onBlur={() => void handleDescriptionBlur()}
            placeholder="Describe what is happening, where, and who it affects."
            className="min-h-36 resize-y"
            required
          />
          <p className="text-xs text-muted-foreground">
            {isCategorizing
              ? "Assigning a civic category..."
              : "Category assignment runs when you leave this field."}
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="issue-category" className="text-sm font-semibold text-foreground">
            Category (Auto-assigned)
          </label>
          <div className="relative">
            <Input
              id="issue-category"
              value={isCategorizing ? "Assigning category..." : category}
              placeholder="Complete the description first"
              disabled
              readOnly
            />
            {isCategorizing && (
              <LoaderCircle
                className="absolute right-3 top-2.5 size-4 animate-spin text-primary"
                aria-hidden
              />
            )}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="sr-only"
            />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => photoInputRef.current?.click()}
            >
              <Upload aria-hidden />
              {photoName ? "Photo selected" : "Upload Photo"}
            </Button>
            {photoName && (
              <p className="mt-2 truncate text-xs text-muted-foreground">{photoName}</p>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGetLocation}
            disabled={isLocating}
          >
            {isLocating ? (
              <LoaderCircle className="animate-spin" aria-hidden />
            ) : (
              <MapPin aria-hidden />
            )}
            {isLocating ? "Finding location..." : locationText || "Get Current Location"}
          </Button>
        </div>

        {formMessage && (
          <p
            role={formMessage.type === "error" ? "alert" : "status"}
            className={
              formMessage.type === "error" ? "text-sm text-destructive" : "text-sm text-emerald-700"
            }
          >
            {formMessage.text}
          </p>
        )}

        <Button type="submit" className="h-11 w-full" disabled={isSubmitting || isCategorizing}>
          {isSubmitting && <LoaderCircle className="animate-spin" aria-hidden />}
          {isSubmitting ? "Submitting report..." : "Submit Report"}
        </Button>
      </form>
    </section>
  );
}
