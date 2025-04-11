import { CreditCardFormButtons } from "@/components/molecules/credit-card-form-buttons/CreditCardFormButtons";
import { CreditCardFormFields } from "@/components/molecules/credit-card-form-fields/CreditCardFormFields";
import { useState } from "react";

export function CreditCardForm() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <CreditCardFormFields isEditing={isEditing} />
      <CreditCardFormButtons
        isEditing={isEditing}
        onEditToggle={() => setIsEditing((prev) => !prev)}
      />
    </>
  );
}