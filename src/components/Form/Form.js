import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { cost_models } from "../../db/costModels";
import { publishers_list } from "../../db/publihersList";
import { countries } from "../../db/countries";
import {
  addCustomer,
  editCustomer,
} from "../../redux/customer/customerActions";
import SaveIcon from "@material-ui/icons/Save";
import styled from "styled-components";

export default function Form({ onCloseModal, customerForEdit, getCustomer }) {
  const [id, setId] = useState(null);

  const [model, setModel] = useState("CPA");
  const [publisher, setPublisher] = useState("Any");
  const [country, setCountry] = useState("Any");
  const [cost, setCost] = useState("");
  const [currency, setCurrency] = useState("USD");
  const dispatch = useDispatch();

  useEffect(() => {
    if (customerForEdit) {
      const { id, model, publisher, country, cost, currency } = customerForEdit;
      setId(id);
      setModel(model);
      setPublisher(publisher);
      setCountry(country);
      setCost(cost);
      setCurrency(currency);
    }
    return () => {
      setId(null);
      setModel("CPA");
      setPublisher("Any");
      setCountry("Any");
      setCost("");
      setCurrency("");
    };
  }, [getCustomer, customerForEdit]);

  const changeModel = (event) => setModel(event.target.value);
  const changePublisher = (event) => {
    setPublisher(event.target.value);
    setCurrency(event.target.selectedOptions[0].dataset.currency);
  };
  const changeCurrency = (event) => {
    setCurrency(event.target.value);
  };
  const changeCountry = (event) => setCountry(event.target.value);
  const changeCost = (event) => setCost(event.target.value);

  const reset = () => {
    setModel("CPA");
    setPublisher("Any");
    setCountry("Any");
    setCost("");
    setCurrency("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (customerForEdit) {
      setId(id);
      setModel(model);
      setPublisher(publisher);
      setCountry(country);
      setCost(cost);
      setCurrency(currency);
      dispatch(
        editCustomer({
          id,
          model,
          publisher,
          cost,
          country,
          currency,
        })
      );
      reset();

      onCloseModal();
      return;
    }
    dispatch(
      addCustomer({ id: Date.now(), model, publisher, cost, country, currency })
    );

    onCloseModal();
  };
  return (
    <form onSubmit={handleSubmit}>
      <ModalHeader>
        <span>Custom Cost</span>{" "}
        <Save type="submit">
          Save <SaveIcon />
        </Save>
      </ModalHeader>
      <FormContent>
        <div>
          <Label htmlFor="model">
            Model
            <SelectSmall
              id="model"
              name="model"
              onChange={changeModel}
              value={model}
            >
              {cost_models.map((model) => (
                <option key={model.key} value={model.value}>
                  {model.value}
                </option>
              ))}
            </SelectSmall>
          </Label>
          <Label htmlFor="publisher">
            Publisher
            <Select
              id="publisher"
              name="publisher"
              onChange={changePublisher}
              value={publisher}
            >
              <option value="any" data-currency="USD">
                Any
              </option>

              {publishers_list.map((publisher) => (
                <option key={publisher.id} data-currency={publisher.currency}>
                  {publisher.name}
                </option>
              ))}
            </Select>
          </Label>
          <Label htmlFor="countries">
            Country{" "}
            <Select
              id="country"
              name="country"
              onChange={changeCountry}
              value={country}
            >
              <option value="any">Any</option>

              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </Select>
          </Label>
        </div>

        <label htmlFor="cost">
          Custom Cost
          <InputCost
            required
            type="number"
            name="cost"
            value={cost}
            onChange={changeCost}
          />
          <Currency
            name="currency"
            id=""
            onChange={changeCurrency}
            value={currency}
          >
            <option value="USD">$</option>
            <option value="EUR">€</option>
          </Currency>
        </label>
      </FormContent>
    </form>
  );
}

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: black;
  color: gray;
  align-items: center;
  padding: 10px;
`;
const Save = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  text-decoration: underline;
  cursor: pointer;
`;

const FormContent = styled.div`
  padding: 30px 15px;
  display: flex;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const SelectSmall = styled.select`
  padding: 5px 10px;
  width: 100px;
  margin-top: 5px;
`;

const Select = styled.select`
  padding: 5px 10px;
  width: 150px;
  margin-top: 5px;
`;

const InputCost = styled.input`
  padding: 5px 10px;
  width: 100px;
  margin-top: 5px;
  /* position: relative; */
`;

const Currency = styled.select`
  border-radius: 50%;
  position: absolute;
  right: 35px;
  padding: 5px;
  height: 40px;
  width: 40px;
`;
