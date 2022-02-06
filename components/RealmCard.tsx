import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addRealmToWatchlist } from "../store/realmSlice";
import { RealmIcon } from "./RealmIcon";

interface RealmCardProps {
  realmId: string;
  onClick: any;
}

export const RealmCard = ({ realmId, onClick }: RealmCardProps) => {
  const { realmsData, realmWatchlist } = useAppSelector(
    (state) => state.realms
  );
  const dispatch = useAppDispatch();

  const handleRealmClick = () => {
    dispatch(addRealmToWatchlist(realmId));
    onClick();
  };

  const realmInfo = realmsData[realmId];

  return (
    <ContainerButton
      onPress={handleRealmClick}
      key={realmId}
      activeOpacity={0.4}
    >
      <Container>
        <RealmIcon realmId={realmId} />
        <RealmName>{realmInfo.displayName || realmInfo.symbol}</RealmName>
      </Container>
    </ContainerButton>
  );
};

const ContainerButton = styled.TouchableOpacity`
  height: 140px;
  width: 45%;
  margin-bottom: ${(props: any) => props.theme.spacing[3]};
  border-radius: 4px;
  background: ${(props: any) => props.theme.gray[800]};
  padding-left: ${(props: any) => props.theme.spacing[3]};
  padding-right: ${(props: any) => props.theme.spacing[3]};
`;

const RealmName = styled.Text`
  margin-top: ${(props: any) => props.theme.spacing[3]}
  color: ${(props: any) => props.theme.gray[100]};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 140px;
`;
