"use client";
import React, { useState } from "react";
import Stepper from "./Stepper";

function AddPropertyForm() {
  const [step, setStep] = useState<number>(1);
  const steps = [
    {
      label: "Basic",
    },
    {
      label: "Locations",
    },
    {
      label: "Features",
    },
    {
      label: "Pictures",
    },
    {
      label: "Contact",
    },
  ];

  return (
    <div>
      <Stepper items={steps} activeItem={step} setActiveItem={setStep} />
    </div>
  );
}

export default AddPropertyForm;
