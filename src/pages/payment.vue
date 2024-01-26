<!-- App.vue -->
<template>
  
  <div v-if="!payementSuccess">
  <div>
    <img src="./assets/icon/logo.jpeg" alt="" style="width: 20%; border-radius: 50%;">
  </div>
  <h1>Paiement</h1>
    <!-- <button v-if="paymentFormVisible" @click="loadPaymentForm()">Payer</button> -->
    <div class="mt-10">
      <div class="w-full md:w-10/12 mx-auto relative">
        <div class="grid lg:grid-cols-2 gap-8 h-full">
          <div class="px-4 md:px-0 h-full">
            <div v-show="formLoaded" style="display: flex; justify-content: space-between; margin: auto;">
              <input class="rounded-box" placeholder="Nom" required/>
              <input class="rounded-box" placeholder="Prénom" required/>
            </div>
            <div v-show="formLoaded" id="payzen-payment-form" class="mt-5 mb-32"></div>

            <div v-show="!formLoaded" class="gap-y-5 mt-5 grid">
              <div class="pulse-container">
                <div class="pulse"></div>
              </div>
              <div class="pulse-container">
                <div class="pulse"></div>
              </div>
              <div class="pulse-container">
                <div class="pulse"></div>
              </div>
              <div class="pulse-container">
                <div class="pulse"></div>
              </div>    

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else
      class="w-screen h-screen flex content-center justify-center items-center"
    >
      <div class="bg-white p-6 marker:">
        <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6" style="width: 100px;">
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div class="text-center">
          <h3
            class="md:text-2xl text-base text-gray-900 font-semibold text-center"
          >
            Paiement effectué!
          </h3>
          <p class="text-gray-600 my-2">
            Merci d'avoir effectué votre paiement sécurisé en ligne.
          </p>
          <button onclick="location.reload()">Revenir à la page d'accueil</button>
        </div>
      </div>
    </div>
</template>

<script>
import { loadPayzenPaymentForm } from "../helpers/services/payzen";
import { usePayementStore } from "../stores/usePayement/usePayementStore";
export default {
  data() {
    return {
      payementStore: usePayementStore(),
      formLoaded: false,
      payementSuccess: false,
      paymentFormVisible: true,
    };
  },
  computed:{
    payzen_form_token() {
      return this.payementStore.payzen_form_token;
    },
  },
  methods: {
    async loadPaymentForm() {
      this.paymentFormVisible = false;
      const urlParams = new URLSearchParams(window.location.search);
      const formToken = urlParams.get('fT');
      loadPayzenPaymentForm(
        //form-token :
        formToken,
        "#payzen-payment-form",
        () => {
          console.log("Form ready");
          this.formLoaded = true;
        },
        ($e) => {
          //bloc paiement
          this.payementStore.onPaid($e);
          this.payementSuccess = true;
        }
      );
    }
  },

async beforeMount() {
  await this.loadPaymentForm();
  },

};
</script>

<style lang="scss">
details {
  user-select: none;

  & summary svg {
    transform: rotate(90deg);
  }
}

details[open] {
  & summary svg {
    transform: rotate(-90deg);
  }
}

#payzen-payment-form {
  & .kr-embedded {
    width: 100% !important;
    position: inherit !important;
  }

  & .kr-pan {
    background: transparent !important;
  }

  & .kr-pan,
  .kr-expiry,
  .kr-security-code {
    height: 56px !important;
  }

  & .kr-field-wrapper,
  .kr-field-wrapper-pan,
  .kr-field-component,
  .kr-icon,
  .kr-icon-wrapper-root,
  .kr-help-button {
    height: 100% !important;
    background-color: transparent !important;
  }

  & .kr-expiry,
  .kr-pan,
  .kr-security-code {
    border: 2px solid #d9dbdf !important;
    border-radius: 9999px !important;
    margin-top: 5%;
  }

  & .kr-payment-button {
    border-radius: 9999px !important;
    background-color: #242424 !important;
    color: #f5f5f5;
    font-weight: 600 !important;
    position: absolute !important;
    max-width: 15rem !important;
    margin-top: 3rem !important;
    // right: 0 !important;
    text-align: center !important;
    margin-top: 1% !important;
    width: 100% !important;
    font-size: 18px;
  }

  & .kr-field-component {
    padding-left: 10px !important;
    padding-top: 12px !important;
  }

  & .kr-help-button-wrapper {
    padding-right: 10px !important;
  }

  & .kr-input-field {
    border: 2px solid black;
  }

  /* Change the background color of the input fields in iframes */
  & iframe html body input[type="text"],
  iframe html body input[type="tel"],
  iframe html body input[type="email"],
  iframe html body input[type="password"] {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    padding: 5px;
    font-size: 14px;
    width: 100%;
  }

  /* Change the border color of the input fields in iframes when focused */
  & iframe html body input[type="text"]:focus,
  iframe html body input[type="tel"]:focus,
  iframe html body input[type="email"]:focus,
  iframe html body input[type="password"]:focus {
    border: 1px solid #000;
  }

  // .kr-form-error,
  // .kr-form-error-visible {
  //   color: #b71c1c !important;
  //   background-color: white !important;
  // }
  & .kr-help-modal-header {
    color: white !important;
    fill: white !important;
    background-color: #1e5caa !important;
    border-top-right-radius: 10px !important;
    border-top-left-radius: 10px !important;
  }

  &
  .kr-embedded
  .kr-help-button-wrapper
  .kr-help-modal-wrapper
  .kr-help-modal
  .kr-help-modal-header
  .kr-help-modal-close-button
  svg
  path {
    fill: white !important;
  }

  & .kr-help-modal {
    border-radius: 10px !important;
  }

  & .kr-embedded .kr-help-button-wrapper .kr-help-modal-wrapper .kr-help-modal {
    min-width: 300px !important;
    width: 700px !important;
  }

  & .kr-embedded .kr-form-error span {
    padding: 4px 0px !important;
  }

  & .kr-embedded .kr-pan .kr-field-component.kr-disabled,
  .kr-iframe-wrapper,
  .kr-embedded .kr-pan .kr-help-button-wrapper.kr-disabled,
  .kr-embedded .kr-expiry .kr-help-button-wrapper.kr-disabled,
  .kr-embedded .kr-security-code .kr-help-button-wrapper.kr-disabled {
    background-color: transparent !important;
  }


}

#prefix {
  position: absolute !important;
  height: 100%;
  min-width: 6rem;
}

#prefix .vs__dropdown-toggle {
  border: 0 !important;
  border-right: 1px #d9dbdf solid;
}

#prefix div {
  height: 100%;
}

#prefix .vs__clear {
  display: none !important;
}

.rounded-box {
      width: 45%;
      height: 10%;
      background-color: rgba(52, 152, 219, 0);
      border-radius: 30px; 
      padding: 15px;
      color: black;
      text-align: left;
      border: 2px solid #ffffffb8;
      font-family: Poppins, sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
    }

.rounded-box:focus {
    outline: 0px solid #ffffffb8;
}

.pulse-container {
      display: grid;
      gap: 5px;
      margin-top: 5px;
      grid-template-columns: repeat(3, 1fr);
    }

    .pulse {
      width: 800px;
      height: 15px;
      border-radius: 45%;
      background-color: #83672c;
      animation: pulseAnimation 1s infinite alternate;
    }

    @keyframes pulseAnimation {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.2);
      }
    }
</style>
