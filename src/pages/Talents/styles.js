import styled from "styled-components";

export const TalentDetailsContainer = styled.div`
  .MuiPaper-root {
    padding: 30px;
    width: 90%;
    margin: 20px auto;
  }

  .form-session-title {
    font-size: 20px;
  }

  .form-header-infos-container {
    display: flex;
    justify-content: space-between;
    padding: 15px 0px;
    border-bottom: 1px solid #ccc;
  }

  .action-buttons-container {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .container-form-with-divider {
    border-bottom: 1px solid #ccc;
    padding: 30px 0;
    width: 100%;
  }

  .button-copy-job {
    height: 56px;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
`;
