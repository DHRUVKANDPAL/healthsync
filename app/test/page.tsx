'use client'
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { Progress } from "@/components/ui/progress";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { PlusCircleIcon } from "lucide-react";

export default function Test() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); 
  const isSmallDevice = useMediaQuery("only screen and (max-width : 400px)");

  const handleSaveClick = async () => {
    if (file) {
      setIsDialogOpen(true);
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          setProgress(progress);
          if (progress === 100) {
            setIsDialogOpen(false);
          }
        },
      });
      console.log(res);
    } else {
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-2xl" onClick={() => setIsDialogOpen(true)}>
          <PlusCircleIcon></PlusCircleIcon>
          </Button>
        </DialogTrigger>
        {isSmallDevice ? (
          <DialogContent className="max-w-[310px]">
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
              <Progress className="w-[320px]"  value={progress}></Progress>
              <div className="pt-2">
                <Button onClick={handleSaveClick} className="w-[320px]">
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
