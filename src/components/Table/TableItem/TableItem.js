import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCustomer } from "../../../redux/customer/customerActions";
import styled from "styled-components";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function TableItem({
  model,
  cost,
  currency,
  publisher,
  country,
  id,
  toggleModal,
  getCustomer,
}) {
  const [isShow, setIsShow] = useState(false);
  const showCountry = () => setIsShow(!isShow);
  const dispatch = useDispatch();
  return (
    <tbody>
      <Tr>
        <Th>Model</Th>
        <Th>Custom Cost</Th>
        <Th>Publisher</Th>
        <Th>
          <Button onClick={() => dispatch(deleteCustomer(id))}>
            <HighlightOffIcon fontSize="small" />
          </Button>
          <Button onClick={showCountry}>
            {isShow ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
        </Th>
      </Tr>
      <tr>
        <Td>{model}</Td>
        <Td>
          {cost}
          {currency === "USD" ? "$" : "€"}
        </Td>
        <Td>{publisher}</Td>
        <Td>
          <Button
            onClick={() => {
              toggleModal();
              getCustomer({ id, model, cost, currency, publisher, country });
            }}
          >
            <EditIcon color="disabled" fontSize="small" />
          </Button>
        </Td>
      </tr>
      {isShow && (
        <tr>
          <Th></Th>
          <Th></Th>
          <Th>Country</Th>
        </tr>
      )}
      {isShow && (
        <tr>
          <Td></Td>
          <Td></Td>
          <Td>{country}</Td>
        </tr>
      )}
    </tbody>
  );
}

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  outline: none;
  padding: 0;
  color: gray;
`;

const Th = styled.th`
  padding: 2px 10px 2px 10px;
`;

const Td = styled.td`
  padding: 2px 10px 2px 10px;
`;
const Tr = styled.tr`
  border: 1px solid black;
  border-bottom: none;
`;
