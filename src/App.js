import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./components/Input";
import Button from "./components/Button";
import Container from "./components/Container";
import Section from "./components/Section";
import Balance from "./components/Balance";

const InteresCompuesto = (deposito, contribution, years, interes) => {
  let total = deposito;
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (interes * 0.01 + 1);
  }
  return Math.round(total);
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
function App() {
  const [balance, setBalance] = useState("");
  const handleSubmit = ({ deposito, contribution, years, interes }) => {
    const val = InteresCompuesto(
      Number(deposito),
      Number(contribution),
      Number(years),
      Number(interes)
    );
    setBalance(formatter.format(val));
  };

  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposito: "",
            contribution: "",
            years: "",
            interes: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposito: Yup.number()
              .required("Campo obligatorio")
              .typeError("El campo debe de ser un numero"),
            contribution: Yup.number()
              .required("Campo obligatorio")
              .typeError("El campo debe de ser un numero"),
            years: Yup.number()
              .required("Campo obligatorio")
              .typeError("El campo debe de ser un numero"),
            interes: Yup.number()
              .required("Campo obligatorio")
              .typeError("El campo debe de ser un numero")
              .min(0, "El valor minimo debe de ser 0")
              .max(100, "El valor maximo de interes debe de ser 100"),
          })}
        >
          <Form>
            <Input name="deposito" label="Deposito inicial" />
            <Input name="contribution" label="Contribucion anual" />
            <Input name="years" label="Years" />
            <Input name="interes" label="Interes" />
            <Button type="submit">Calcular</Button>
          </Form>
        </Formik>
        {balance != "" ? <Balance>Balance final: {balance}</Balance> : null}
      </Section>
    </Container>
  );
}

export default App;
