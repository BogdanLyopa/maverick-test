import { useSelector } from "react-redux";
import TableItem from "./TableItem/TableItem";
import { getVisibleCustomers } from "../../redux/customer/customerSelectors";
import styled from "styled-components";

export default function Table({ toggleModal, getCustomer }) {
  const customers = useSelector(getVisibleCustomers);
  return (
    <div>
      <List>
        {customers.map((customer) => (
          <TableItem
            {...customer}
            key={customer.id}
            toggleModal={toggleModal}
            getCustomer={getCustomer}
          />
        ))}
      </List>
    </div>
  );
}

const List = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  margin-left: 8px;
  margin-top: 15px;
`;
