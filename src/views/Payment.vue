<!-- App.vue -->
<template>
  
    <div v-if="!payementSuccess">
    <div>
      <img src="../assets/icon/logo.jpeg" alt="" style="width: 35%; border-radius: 50%;">
    </div>
    <h1 style="color: black;"></h1>
      <!-- <button v-if="paymentFormVisible" @click="loadPaymentForm()">Payer</button> -->
      <div class="mt-10">
        <div class="w-full md:w-10/12 mx-auto relative">
          <div class="grid lg:grid-cols-2 gap-8 h-full">
            <div class="px-4 md:px-0 h-full" style="margin-bottom: 10%;">
              <div v-show="formLoaded" style="display: flex; justify-content: space-between; margin: auto; gap: 15px;">
                <input class="rounded-box" placeholder="Nom" required/>
                <input class="rounded-box" placeholder="Prénom" required/>
              </div>
              <div v-show="formLoaded" id="payzen-payment-form" class="mt-5 mb-32"></div>
  
              <div v-show="!formLoaded" class="mt-5 mb-32" id="grid">
                <div class="pulse-container flex flex-wrap justify-center gap-4 md:gap-10">
                    <div class="pulse"></div>
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
            this.$router.push('/success');
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
      border: 2px solid #9c81263f !important;
      border-radius: 10px !important;
      margin-top: 5%;
      width: auto;
      height: 50px !important;
    }
  
    & .kr-payment-button {
    font-size: 18px;
    border-radius: 10px!important;
    background-color: #242424!important;
    color: #a3812b!important;
    font-weight: 600!important;
    width: 100%!important;
    text-align: center!important;
    margin: 20px 0 5px!important;
    padding-top: 10px!important;
    padding-bottom: 10px!important;
    }
  
    & .kr-field-component {
      padding-left: 20px !important;
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
        border-radius: 10px; 
        padding: 15px;
        color: black;
        text-align: left;
        border: 2px solid #9c81263f !important;
        font-family: Poppins, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
      }
  
  .rounded-box:focus {
      outline: 0px solid #ffffffb8;
  }

  .rounded-box::placeholder {
    font-family: Arial;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    color: rgba(128, 128, 128, 0.815);
  }

  #grid {
    display: grid;
    grid-template-columns: 1fr; 
    gap: 10px; 
}
  
  .pulse-container {
        display: flex;
        gap: 5%;
        margin-top: 5px;
        justify-content: center;
      }
  
      .pulse {
        flex-wrap: 1;
        width: 100%;
        height: 2.5em;
        border-radius: 2%;
        background-color: rgb(131 103 44 / 10%);
        animation: pulseAnimation 1s infinite alternate;
        border: 2px solid #08080829;
      }
  
      @keyframes pulseAnimation {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(1.2);
        }
      }

      :root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  /* color-scheme: light dark; */
  color: rgba(255, 255, 255, 0.87);
  background-color: white;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 15px;
  font-weight: 500;
  font-family: inherit;
  background-color: #654a10;
  cursor: pointer;
  transition: border-color 0.25s;
  font-weight: bold;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

@media screen and (max-width: 300px) {
    .pulse-container {
        flex-direction: column; 
        text-align: center;
        max-width: 100%; 
    }
}
  </style>