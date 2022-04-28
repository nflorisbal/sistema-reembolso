import React from 'react';
import {
  ContainerMain,
  ContainerWelcome,
  PageTitle,
} from '../../global.styles';

const ZeroTicket = () => {
  return (
    <ContainerMain>
      <ContainerWelcome>
        <PageTitle>Ainda não há tickets.</PageTitle>
      </ContainerWelcome>
    </ContainerMain>
  );
};

export default ZeroTicket;
