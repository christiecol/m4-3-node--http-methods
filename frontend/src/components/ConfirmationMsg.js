import React from "react";
import styled from "styled-components";

const ConfirmationMsg = ({ formData }) => (
  <Wrapper>
    Order Confirmed! Thanks, {formData.givenName}. Your order of{" "}
    {formData.order} will be send to your home in {formData.province}, Canada.
    Thank you for participating!
  </Wrapper>
);

const Wrapper = styled.p`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  z-index: 4;
`;

export default ConfirmationMsg;
