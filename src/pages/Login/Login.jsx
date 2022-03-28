import { useEffect } from "react";
import { getCountry } from "../../api/api";
import home from "./Login.module.scss";
export const Login = () => {
  useEffect(() => {
    async function test() {
      const countries = await getCountry();
      console.log(countries);
    }
    test();
  }, []);
  return (
    <main className={home.container}>
      <h1></h1>
    </main>
  );
};
