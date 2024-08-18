import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type Props = {
  signUpTab: React.ReactNode;
  signinTab: React.ReactNode;
};

const Tabswitcher = (props: Props) => {
  return (
    <Tabs defaultValue="Sign-in" className="">
      <TabsList>
        <TabsTrigger value="Sign-in">Sign-in</TabsTrigger>
        <TabsTrigger value="Sign-up">Sign-up</TabsTrigger>
      </TabsList>
      <TabsContent value="Sign-in">{props.signinTab}</TabsContent>
      <TabsContent value="Sign-up">{props.signUpTab}</TabsContent>
    </Tabs>
  );
};

export default Tabswitcher;
