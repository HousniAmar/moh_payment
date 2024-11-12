import {defineStore} from "pinia";
import router from '../../main'; // Adjust the path as necessary to import the router instance


export const usePayementStore = defineStore("payementStore", {
    state: () => ({
        payement: null, payzen_form_token: window.localStorage.getItem("formToken"),
    }),

    actions: {

        async storePayement() {
            //redirection vers page
            console.log("ok !");
            router.push('/success'); // Use the router instance to navigate

        },

        async onPaid(event, orderId = null) {
            console.log("event");
            console.log(event);
            console.log(event?.clientAnswer);
            if (event?.clientAnswer?.orderStatus === "PAID") {
                window.localStorage.setItem("eventPayment", JSON.stringify(event));
                console.log("ok");
                
                return await this.storePayement(event, orderId);
            } else {
                // Show error message to the user
                const error_div = document.getElementById("paymentFailed");
                if (error_div) error_div.style.display = "block";
            }
        },

    },
});
