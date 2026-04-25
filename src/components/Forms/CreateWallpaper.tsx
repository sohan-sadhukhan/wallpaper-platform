"use client";

import { Button } from "@/components/shadcnui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Field, FieldError, FieldLabel } from "@/components/shadcnui/field";
import createWallpaperAction from "@/server/createWallpaperAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2Icon, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { z } from "zod";
import { Input } from "../shadcnui/input";
import { Label } from "../shadcnui/label";

export const ORIENTATION_VALUES = ["portrait", "landscape"] as const;
export type WallpaperOrientation = (typeof ORIENTATION_VALUES)[number];

// Zod Schema
const wallpaperSchema = z.object({
  orientation: z.enum(ORIENTATION_VALUES),
});

export type WallpaperFormValues = z.infer<typeof wallpaperSchema>;

// UI config for orientation cards
const ORIENTATION_OPTIONS: {
  value: WallpaperOrientation;
  label: string;
  desc: string;
  icon: string;
}[] = [
  {
    value: "portrait",
    label: "Portrait",
    desc: "Tall · 1080 × 1920",
    icon: "▯",
  },
  {
    value: "landscape",
    label: "Landscape",
    desc: "Wide · 1920 × 1080",
    icon: "▭",
  },
];

const CreateWallpaper = () => {
  // Controls upload button loading state
  const [isUploading, setIsUploading] = useState(false);

  // Handles image selection + file validation
  const { openFilePicker, filesContent, plainFiles, clear, errors } =
    useFilePicker({
      readAs: "DataURL",
      accept: "image/jpeg, image/png, image/webp",
      multiple: false,
      validators: [new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 })],
    });

  const { handleSubmit, control, reset } = useForm<WallpaperFormValues>({
    resolver: zodResolver(wallpaperSchema),
    defaultValues: {
      orientation: undefined,
    },
    mode: "all",
  });

  const createWallpaperHandler = async (data: WallpaperFormValues) => {
    setIsUploading(true);

    const { isSuccess, message } = await createWallpaperAction({
      file: plainFiles[0],
      orientation: data.orientation,
    });
    setIsUploading(false);

    if (!isSuccess) {
      toast.error(message);
      return;
    }

    toast.success(message);
    reset();
    clear();
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Wallpaper Details</CardTitle>
          <CardDescription>
            Image will be resized automatically based on the orientation you
            pick.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(createWallpaperHandler)}
            className="grid gap-6"
            noValidate
            aria-label="Upload wallpaper form">
            {/* ── Image Picker ── */}
            <Field>
              <FieldLabel>Image File</FieldLabel>

              <figure className="m-0 w-full">
                {filesContent[0]?.content ?
                  <Image
                    src={filesContent[0]?.content}
                    alt="Selected wallpaper preview"
                    width={700}
                    height={300}
                    className="h-48 w-full rounded-xl object-contain"
                  />
                : <div
                    role="img"
                    aria-label="No image selected"
                    className="border-border bg-muted/30 text-muted-foreground flex h-44 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed">
                    <ImageIcon
                      size={32}
                      strokeWidth={1.2}
                    />
                    <span className="text-sm">No image selected</span>
                    <span className="text-muted-foreground/60 text-xs">
                      JPEG · PNG · WebP &nbsp;·&nbsp; max 5 MB
                    </span>
                  </div>
                }

                {plainFiles[0] && (
                  <figcaption className="text-muted-foreground mt-1 text-center text-xs">
                    {plainFiles[0].name}
                  </figcaption>
                )}
              </figure>

              {errors[0] && (
                <p
                  role="alert"
                  className="text-destructive text-sm">
                  File is too large. Maximum size is 5 MB.
                </p>
              )}

              <Button
                type="button"
                onClick={openFilePicker}
                variant="outline"
                className="w-full cursor-pointer">
                <ImageIcon size={15} />
                {plainFiles[0] ? "Change Image" : "Select Image"}
              </Button>
            </Field>

            {/* ── Orientation ── */}
            <Controller
              name="orientation"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Orientation</FieldLabel>
                  {ORIENTATION_OPTIONS.map((opt) => {
                    const selected = field.value === opt.value;
                    return (
                      <Label
                        key={opt.value}
                        className={`flex flex-1 cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 p-4 transition-all duration-150 select-none ${
                          selected ?
                            "border-primary bg-primary/10 text-foreground"
                          : fieldState.invalid ?
                            "border-destructive/50 bg-destructive/5 text-muted-foreground"
                          : "border-border bg-muted/30 text-muted-foreground hover:border-border/80"
                        } `}>
                        <Input
                          type="radio"
                          name="orientation"
                          value={opt.value}
                          checked={selected}
                          onChange={() => field.onChange(opt.value)}
                          className="sr-only"
                          aria-label={opt.label}
                        />
                        <span className="text-2xl leading-none">
                          {opt.icon}
                        </span>
                        <span className="text-sm font-medium">{opt.label}</span>
                        <span className="text-muted-foreground text-xs">
                          {opt.desc}
                        </span>
                      </Label>
                    );
                  })}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* ── Submit ── */}
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isUploading || !plainFiles[0]}>
              {isUploading ?
                <>
                  <Loader2Icon className="animate-spin" />
                  Uploading…
                </>
              : <>
                  <UploadIcon />
                  Upload Wallpaper
                </>
              }
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateWallpaper;
