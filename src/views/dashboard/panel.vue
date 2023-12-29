<template>
  <v-app class="h-100 bg-primary">
    <nav class="main-nav d-flex align-center w-100 justify-space-between px-4">
      <router-link to="/" class="text-decoration-none">
        <TitleComponent sm> Stock </TitleComponent>
      </router-link>
      <div>
        <v-switch
          @click="toggleTheme()"
          v-model="stateSwitch"
          hide-details
          inset
        ></v-switch>
      </div>
    </nav>
    <v-container class="h-100 ma-auto">
      <AnalysisPanelRoot>
        <v-col cols="12" sm="4" class="d-flex justify-center pa-0">
          <CardPanel>
            <TitleCardPanel sm> Total in stock </TitleCardPanel>
            <TitleComponent md>
              {{ formatValue(totalValueInStock) }}
            </TitleComponent>
          </CardPanel>
        </v-col>
        <v-col
          cols="12"
          sm="4"
          class="d-flex justify-center pa-0 px-0 py-4 py-sm-0 px-sm-4"
        >
          <CardPanel>
            <TitleCardPanel sm> Total in departure </TitleCardPanel>
            <TitleComponent md>
              {{ formatValue(totalValueInDepartures) }}
            </TitleComponent>
          </CardPanel>
        </v-col>
        <v-col cols="12" sm="4" class="d-flex justify-center pa-0">
          <CardPanel>
            <TitleCardPanel sm> Total products in stock </TitleCardPanel>
            <TitleComponent md>
              {{ totalProducts }}
            </TitleComponent>
          </CardPanel>
        </v-col>
      </AnalysisPanelRoot>
      <header class="d-flex justify-start w-100">
        <PrimaryButton @click="handlerAddProduct.open()">
          Add Product
        </PrimaryButton>
      </header>
      <v-main class="my-7">
        <v-row class="w-100">
          <v-col cols="12" md="6">
            <TitleComponent sm> Input </TitleComponent>
            <v-table class="bg-third mt-3 rounded main-table list-modal">
              <thead>
                <tr>
                  <th class="text-left">Id</th>
                  <th class="text-left">Product</th>
                  <th class="text-left">Weight</th>
                  <th class="text-left">Quantity</th>
                  <th class="text-left">Value</th>
                  <th class="text-left">Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in stock.input" :key="item.product">
                  <td>{{ item.id }}</td>
                  <td>{{ item.product }}</td>
                  <td>{{ parseInt(item.weight).toFixed(2) }} Kg</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ formatValue(item.value) }}</td>
                  <td>
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <EditButton size="30" v-bind="props" />
                      </template>
                      <v-list class="list-modal">
                        <v-list-item class="px-2">
                          <v-list-item-title
                            class="list-item-modal py-1 px-3 rounded"
                            @click="handlerEditProduct.open(index)"
                            style="cursor: pointer"
                            >Edit</v-list-item-title
                          >
                          <v-list-item-title
                            class="list-item-modal py-1 px-3 rounded"
                            @click="handlerLeaveProduct.open(index)"
                            style="cursor: pointer"
                            >Leave product</v-list-item-title
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
          <v-col cols="12" md="6">
            <TitleComponent sm> Output </TitleComponent>
            <v-table class="bg-third mt-3 rounded main-table list-modal">
              <thead>
                <tr>
                  <th class="text-left">Id</th>
                  <th class="text-left">Product</th>
                  <th class="text-left">Weight</th>
                  <th class="text-left">Quantity</th>
                  <th class="text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in stock.output" :key="item.product">
                  <td>{{ item.id }}</td>
                  <td>{{ item.product }}</td>
                  <td>{{ parseInt(item.weight).toFixed(2) }} Kg</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ formatValue(item.value) }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-main>
    </v-container>

    <!--Add new product-->

    <AddProductModal
      :modal="stateModal"
      @closeModal="handlerAddProduct.close()"
    >
      <nav class="d-flex justify-space-between">
        <TitleComponent sm> Add Product </TitleComponent>
        <CloseButton @EventButton="handlerAddProduct.close()" size="30" />
      </nav>
      <v-divider class="my-4" />
      <v-text-field
        :rules="formRules.productRules"
        label="Product name"
        v-model="product"
      ></v-text-field>
      <v-text-field
        :rules="formRules.valueRules"
        label="Value"
        prefix="R$"
        v-model="value"
      ></v-text-field>
      <v-text-field
        :rules="formRules.weightRules"
        label="Weight"
        suffix="Kg"
        v-model="weight"
      ></v-text-field>
      <v-text-field
        :rules="formRules.quantityRules"
        label="Quantity"
        v-model="quantity"
      ></v-text-field>
      <PrimaryButton @click="addNewProduct"> Add new product </PrimaryButton>
    </AddProductModal>

    <!--Edit Product-->

    <AddProductModal
      :modal="stateModalEditProduct"
      @closeModal="handlerEditProduct.close()"
    >
      <nav class="d-flex justify-space-between">
        <TitleComponent sm> Edit Product </TitleComponent>
        <CloseButton @EventButton="handlerEditProduct.close()" size="30" />
      </nav>
      <v-divider class="my-4" />
      <v-text-field
        :rules="formRules.productRules"
        label="Product name"
        v-model="product"
      ></v-text-field>
      <v-text-field
        :rules="formRules.valueRules"
        label="Value"
        prefix="R$"
        v-model="value"
      ></v-text-field>
      <v-text-field
        :rules="formRules.weightRules"
        label="Weight"
        suffix="Kg"
        v-model="weight"
      ></v-text-field>
      <v-text-field
        :rules="formRules.quantityRules"
        label="Quantity"
        v-model="quantity"
      ></v-text-field>
      <PrimaryButton @click="EditProduct(currentIdProduct)">
        Confirm
      </PrimaryButton>
    </AddProductModal>

    <!--Leave product-->

    <AddProductModal
      :modal="stateModalLeaveProduct"
      @closeModal="handlerLeaveProduct.close()"
    >
      <nav class="d-flex justify-space-between">
        <TitleComponent sm> Leave Product </TitleComponent>
        <CloseButton @EventButton="handlerLeaveProduct.close()" size="30" />
      </nav>
      <v-divider class="my-4" />
      <TitleCardPanel md class="mb-3">
        How many products will come out?
      </TitleCardPanel>
      <TitleComponent sm class="mb-3">
        Total products: {{ leaveQuantity }}
      </TitleComponent>
      <v-text-field
        :rules="formRules.quantityRules"
        label="Quantity"
        v-model="quantityOfProductsLeft"
        type="number"
        :maxLength="leaveQuantity"
        @input="validateInput"
      ></v-text-field>
      <PrimaryButton @click="LeaveProduct(currentIdProduct)">
        Confirm
      </PrimaryButton>
    </AddProductModal>
  </v-app>
</template>

<script setup>
import TitleComponent from "@/components/TitleComponent.vue";
import AddProductModal from "@/components/AddProductModal/AddProductModal.vue";
import CloseButton from "@/components/CloseButton.vue";
import EditButton from "@/components/EditButton.vue";
import { formatValue } from "@/composables/formatValue";
import { formRules } from "@/composables/formRules";
import AnalysisPanelRoot from "@/components/AnalysisPanel/AnalysisPanelRoot.vue";
import { ref } from "vue";
import CardPanel from "@/components/AnalysisPanel/CardPanel.vue";
import TitleCardPanel from "@/components/AnalysisPanel/TitleCardPanel.vue";
import createProduct from "@/composables/createProduct";
import productCalculation from "@/composables/productCalculation";
import {
  collection,
  query,
  getDocs,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/plugins/firebase";
import { onMounted } from "vue";
import { useCookie } from "@/composables/useCookie";
import { useTheme } from "vuetify";
import PrimaryButton from "@/components/PrimaryButton.vue";
import { watchEffect } from "vue";

const theme = useTheme();

let idUser = ref("");

let stock = ref({ input: [], output: [] });

// Modal add product

let stateModal = ref(false);

const handlerAddProduct = {
  open: () => (stateModal.value = true),
  close: () => (stateModal.value = false),
};

// Get products from Firestore

let cookie = useCookie();

onMounted(async () => {
  const q = query(
    collection(db, "user"),
    where("email", "==", cookie.get("cookie").email)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    stock.value = doc.data().stock;

    // Get id user
    idUser.value = doc.id;

    // get the total value of stock and quantity of products
    if (doc.data().stock.input != undefined) {
      doc.data().stock.input.forEach((product) => {
        totalValueInStock.value += parseInt(product.value);
        totalProducts.value += parseInt(product.quantity);
      });
    }
    // get the total value of exits
    if (doc.data().stock.output != undefined) {
      doc.data().stock.output.forEach((product) => {
        totalValueInDepartures.value += parseInt(product.value);
      });
    }
  });
});

// Add new product

let product = ref("");
let weight = ref("");
let quantity = ref("");
let value = ref("");

const addNewProduct = async () => {
  if (
    validateProductInput(
      product.value,
      weight.value,
      quantity.value,
      value.value
    )
  ) {
    stock.value.input.push(
      createProduct(
        stock.value.input.length,
        product.value,
        weight.value,
        quantity.value,
        value.value
      )
    );

    saveDataToFirestore();
    updateTheAnalysis();
    handlerAddProduct.close();
  }

  clearAllInputs();
};

// Edit product

let stateModalEditProduct = ref(false);
let currentIdProduct = ref();

const handlerEditProduct = {
  open: (id) => {
    stateModalEditProduct.value = true;
    currentIdProduct.value = id;
    product.value = stock.value.input[id].product;
    weight.value = stock.value.input[id].weight;
    quantity.value = stock.value.input[id].quantity;
    value.value = stock.value.input[id].value;
  },
  close: () => {
    stateModalEditProduct.value = false;
    clearAllInputs();
  },
};

const EditProduct = async (id) => {
  if (
    validateProductInput(
      product.value,
      weight.value,
      quantity.value,
      value.value
    )
  ) {
    editStock(id, product.value, weight.value, quantity.value, value.value);
    saveDataToFirestore();
    updateTheAnalysis();
    handlerEditProduct.close();
  }
};

// Leave product

let leaveProduct = ref("");
let leaveWeight = ref("");
let leaveQuantity = ref("");
let leaveValue = ref("");
let quantityOfProductsLeft = ref();

let stateModalLeaveProduct = ref(false);

const handlerLeaveProduct = {
  open: (id) => {
    stateModalLeaveProduct.value = true;
    currentIdProduct.value = id;
    leaveProduct.value = stock.value.input[id].product;
    leaveWeight.value = stock.value.input[id].weight;
    leaveQuantity.value = stock.value.input[id].quantity;
    leaveValue.value = stock.value.input[id].value;
  },
  close: () => (stateModalLeaveProduct.value = false),
};

const LeaveProduct = async (id) => {
  let valueL = stock.value.input[id].value;
  let weightL = stock.value.input[id].weight;

  if (quantityOfProductsLeft.value) {
    if (leaveQuantity.value > quantityOfProductsLeft.value) {
      // add the product to the output
      stock.value.output.push({
        id: stock.value.output.length,
        product: leaveProduct.value,
        value: productCalculation().output(
          valueL,
          leaveQuantity.value,
          quantityOfProductsLeft.value
        ),
        weight: productCalculation().output(
          weightL,
          leaveQuantity.value,
          quantityOfProductsLeft.value
        ),
        quantity: quantityOfProductsLeft.value,
      });

      // removes the desired amount of products
      stock.value.input[id].quantity =
        parseInt(stock.value.input[id].quantity) -
        parseInt(quantityOfProductsLeft.value);

      stock.value.input[id].weight = productCalculation().input(
        weightL,
        weightL,
        leaveQuantity.value,
        quantityOfProductsLeft.value
      );

      stock.value.input[id].value = productCalculation().input(
        valueL,
        valueL,
        leaveQuantity.value,
        quantityOfProductsLeft.value
      );
    } else if (
      parseInt(quantityOfProductsLeft.value) === parseInt(leaveQuantity.value)
    ) {
      stock.value.output.push({
        id: stock.value.output.length,
        product: leaveProduct.value,
        value: productCalculation().output(
          valueL,
          leaveQuantity.value,
          quantityOfProductsLeft.value
        ),
        weight: productCalculation().output(
          weightL,
          leaveQuantity.value,
          quantityOfProductsLeft.value
        ),
        quantity: quantityOfProductsLeft.value,
      });

      // removes the product from the input
      stock.value.input.splice(id, 1);
    }
    saveDataToFirestore();
    updateTheAnalysis();
    clearAllInputs();
    quantityOfProductsLeft.value = "";
    handlerLeaveProduct.close();
  }
};

// Analysis product

let totalValueInStock = ref(0);
let totalValueInDepartures = ref(0);
let totalProducts = ref(0);

// Switch

let stateSwitch = ref(true);

onMounted(() => (stateSwitch.value = theme.global.current.value.dark));

theme.global.name.value = JSON.parse(localStorage.getItem("theme"))
  ? JSON.parse(localStorage.getItem("theme"))
  : "dark";

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  localStorage.setItem("theme", JSON.stringify(theme.global.name.value));
};

// save data to firestore

const saveDataToFirestore = async () => {
  const docRef = doc(db, "user", idUser.value);

  await updateDoc(docRef, {
    stock: stock.value,
  });
};

// update the analysis

const updateTheAnalysis = async () => {
  const q = query(
    collection(db, "user"),
    where("email", "==", cookie.get("cookie").email)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    totalValueInStock.value = 0;
    totalProducts.value = 0;
    totalValueInDepartures.value = 0;

    // get the total value of stock and quantity of products

    doc.data().stock.input.forEach((product) => {
      totalValueInStock.value =
        parseInt(totalValueInStock.value) + parseInt(product.value);
      totalProducts.value =
        parseInt(totalProducts.value) + parseInt(product.quantity);
    });

    // get the total value of exits
    doc.data().stock.output.forEach((product) => {
      totalValueInDepartures.value =
        parseInt(totalValueInDepartures.value) + parseInt(product.value);
    });
  });
};

watchEffect(() => updateTheAnalysis)

const validateInput = () => {
  if (parseInt(quantityOfProductsLeft.value) > parseInt(leaveQuantity.value)) {
    quantityOfProductsLeft.value = leaveQuantity.value;
  }
};

const validateProductInput = (product, weight, quantity, value) => {
  if (
    product.length != 0 &&
    weight.length != 0 &&
    quantity.length != 0 &&
    value.length != 0
  )
    return true;

  return false;
};

const editStock = (id, product, weight, quantity, value) => {
  stock.value.input[id].product = product;
  stock.value.input[id].weight = weight;
  stock.value.input[id].quantity = quantity;
  stock.value.input[id].value = value;
};

const clearAllInputs = () => {
  product.value = "";
  weight.value = "";
  quantity.value = "";
  value.value = "";
  leaveProduct.value = "";
  leaveWeight.value = "";
  leaveQuantity.value = "";
  leaveValue.value = "";
  quantityOfProductsLeft.value = "";
};
</script>

<style lang="scss" scoped>
.main-table {
  overflow-y: auto;
  max-height: 500px;
}

.main-nav {
  background-color: #202024;
}

.list-modal {
  background-color: #121214 !important;
  border: 1px solid #4f4f4f;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.614) !important;
}

.list-modal::-webkit-scrollbar {
  width: 5px !important;
}

.list-item-modal {
  transition: 0.3s;
  font-size: 15px !important;
  &:hover {
    background-color: #212124;
  }
}

.list-modal::-webkit-scrollbar-thumb {
  width: 5px !important;
}
</style>
