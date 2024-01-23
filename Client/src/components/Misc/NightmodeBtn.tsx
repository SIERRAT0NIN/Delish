import React from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./Moonicon";
import { SunIcon } from "./Sunicon";

export default function NightmodeBtn() {
  return (
    <div className="dark-btn content-stretch">
      <Switch
        defaultSelected
        color="success"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
        className="dark-btn "
      >
        Dark mode
      </Switch>
    </div>
  );
}
