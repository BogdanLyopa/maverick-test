import Table from "./components/Table/Table";
import { useState, useCallback } from "react";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";
import Modal from "./components/Modal/Modal";
import styled from "styled-components";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [customerForEdit, setCustomerForEdit] = useState(null);
  const toggleModal = useCallback(() => {
    setShowModal((prevShowModal) => !prevShowModal);
  }, []);

  const getCustomer = (customerForEdit) => {
    setCustomerForEdit(customerForEdit);
  };
  return (
    <div>
      <Head>
        <span>Custom</span>{" "}
        <div>
          <Add
            onClick={() => {
              toggleModal();
              getCustomer();
            }}
          >
            Add
          </Add>
          <AddButton
            onClick={() => {
              toggleModal();
              getCustomer();
            }}
          >
            +
          </AddButton>
        </div>
      </Head>
      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <Form
            onCloseModal={toggleModal}
            customerForEdit={customerForEdit}
            getCustomer={getCustomer}
          />
        </Modal>
      )}

      <Filter />
      <Table toggleModal={toggleModal} getCustomer={getCustomer} />
    </div>
  );
}

export default App;

const Head = styled.div`
  display: flex;
  padding: 10px;
  width: 300px;
  justify-content: space-between;
  border-bottom: 1px solid black;
  align-items: center;
`;

const AddButton = styled.button`
  border: none;
  border-radius: 50%;
  background-color: gray;
  color: white;
  font-size: 25px;
  width: 35px;
  cursor: pointer;
`;
const Add = styled.span`
  cursor: pointer;
  margin-right: 10px;
  text-decoration: underline;
`;
