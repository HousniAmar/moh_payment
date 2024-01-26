import KRGlue from "@lyracom/embedded-form-glue";
const PAYZEN_PUBLIC_KEY =
  "47808908:testpublickey_EFtNA57xIpiDxxTkUUWyrK1AgiQGtMFlWQgLbbY6Pfr2O";
export async function loadPayzenPaymentForm(
  form_token,
  form_id = "#payzen-payment-form",
  onFormReady,
  onSubmit
) {
  const { KR } = await KRGlue.loadLibrary(
    "https://static.payzen.eu/",
    PAYZEN_PUBLIC_KEY
  );
  KR.setFormConfig({
    formToken: form_token,
    publicKey: PAYZEN_PUBLIC_KEY,
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
