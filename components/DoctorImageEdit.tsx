"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { Progress } from "@/components/ui/progress";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { imageEditPatient } from "@/app/(main)/patient-auth/auth.actions";
import { Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { imageEditDoctor } from "@/app/(main)/doctor-auth/authdoc.action";

export default function DoctorImageEdit({ id }: { id: string|string[] }) {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 400px)");
  const router = useRouter();
  const handleSaveClick = async () => {
    if (file) {
      setIsDialogOpen(true);
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        });
        const url = res?.url;
        const result = await imageEditDoctor({ url, id });
        if (result.success) {
          await router.refresh();

          setIsDialogOpen(false);

          location.reload();
        } else {
          console.error("Failed to update patient:", result.error);
         //  Handle error (e.g., show error message to user)
        }
      } catch (error) {
        console.error("Upload failed:", error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  return (
    <div className="">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsDialogOpen(true)}
            variant="outline"
            size="sm"
            className="w-full md:w-auto dark:border-slate-700 dark:text-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            Change Photo
          </Button>
        </DialogTrigger>
        {isSmallDevice ? (
          <DialogContent className="max-w-[310px]">
            <DialogHeader>
              <DialogTitle className="font-semibold text-xl">
                Edit profile Picture
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm space-y-0">
                Make changes to your profile picture here. Click save when
                you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col justify-center items-center space-y-2">
              <SingleImageDropzone
                width={260}
                height={260}
                value={file}
                onChange={(file) => {
                  setFile(file);
                  setProgress(0);
                }}
              />
              <Progress value={progress}></Progress>
            </div>
            <DialogFooter className="flex flex-col justify-end">
              <Button onClick={handleSaveClick} className="w-full">
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        ) : (
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-semibold text-xl">
                Edit profile
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm space-y-0">
                Make changes to your profile picture here. Click save when
                you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col justify-center items-center space-y-2">
              <SingleImageDropzone
                width={320}
                height={320}
                value={file}
                onChange={(file) => {
                  setFile(file);
                  setProgress(0);
                }}
              />
              <Progress
                className="w-[320px] dark:bg-slate-700"
                value={progress}
              ></Progress>
              <div className="pt-2">
                <Button
                  onClick={handleSaveClick}
                  className="w-[320px] dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100"
                >
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
