import React from 'react'
import styled from 'styled-components';
import Adminnavbar from './Dashbord/Adminnavbar';
import Offlinecard from './Offlinecard';
import Onlinecard from './Onlinecard';
const Cartdetail = () => {
    return(
        <Container>
            <Adminnavbar/>
            <MainContent>
              <div className='container grid grid-two-column'>
              <Offlinecard/>
              <Onlinecard/>
              </div>
                
            </MainContent>
        </Container>
   
    );
};

const Container = styled.div`
display: flex;
height: 100vh;
`;

const MainContent = styled.div`
flex-grow: 1;
padding: 20px;
display: flex;
flex-direction: column;
.container {
  max-width: 120rem;
}

.grid {
  gap: 3.2rem;
}
@media (min-width: 1100px) {
  flex-direction: row;
  .grid {
    display: flex;
  }
  }
`;
// const Firstcontent = styled.div`
// flex-grow: 1;
// padding: 20px;
// display: flex;
// flex-direction: column;
// width:500px;
// @media (min-width: 1100px) {
//     width: 50%;
//   }
// `;
// const Secondcontent = styled.div`
// flex-grow: 1;
// padding: 20px;
// display: flex;
// width:500px;
// flex-direction: column;
// @media (min-width: 1100px) {
//     width: 50%;
//   }
// `;

export default Cartdetail
