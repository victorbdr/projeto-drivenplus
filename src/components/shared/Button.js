import styled from "styled-components";

export default function Button({ children, ...otherProps }) {
  return <Wrapper {...otherProps}>{children}</Wrapper>;
}
const Wrapper = styled.button`
  display: flex;
  width: ${(props) => (props.small ? "95px" : "298px")};
  height: 52px;
  background: #ff4791;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border: none;
  p {
    width: 54px;
    height: 16px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;

    color: #ffffff;
    ${(props) => {
      if (props.grey) {
        return `
        background-color: #CECECE;
        `;
      }
      if (props.orange) {
        return `
        background-color: #FF4747;
        `;
      }
    }}
  }
`;
