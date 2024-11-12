import KRGlue from "@lyracom/embedded-form-glue";
// const PAYZEN_PUBLIC_KEY =
//   "22377513:testpublickey_8zhDWmOU69w38IKUA0goGDyZZbGc6o6X9maEwfbrnosVD";
export async function loadPayzenPaymentForm(
  form_token,
  form_id,
  onFormReady,
  onSubmit,
  PAYZEN_PUBLIC_KEY
) {
  console.log("keeeey : ",PAYZEN_PUBLIC_KEY);
  const { KR } = await KRGlue.loadLibrary(
    "https://api-sogecommerce.societegenerale.eu",
    PAYZEN_PUBLIC_KEY
  );
  KR.setFormConfig({
    'kr-form-token' : form_token,
    'kr-public-key': PAYZEN_PUBLIC_KEY,
    "kr-language": "fr-FR",
  })
    .then(({ KR }) => {
      
      return KR.addForm(form_id);
    }) /* add a payment form  to payzen-payment-form div*/
    .then(({ KR, result }) =>
      KR.showForm(result.formId)
    ) /* show the payment form */
    .then(({ KR }) => KR.onFormCreated(() => console.log("Form created")))
    .then(({ KR }) =>
      KR.onFormReady(() => {
        
        onFormReady();
      })
    )
    .then(({ KR }) => KR.onSubmit(($e) => onSubmit($e)));
}
