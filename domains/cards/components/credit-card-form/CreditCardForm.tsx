import { useState } from "react";
import { CreditCardFormFields } from "../../molecules/credit-card-form-fields/CreditCardFormFields";
import { CreditCardFormButtons } from "../../molecules/credit-card-form-buttons/CreditCardFormButtons";

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