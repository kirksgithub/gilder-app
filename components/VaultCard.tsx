import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { TokenList } from "./TokenList";
import { NftList } from "./NftList";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Typography } from "./Typography";
import numeral from "numeral";
import { PublicKeyTextCopy } from "./PublicKeyTextCopy";
import { ExpandableSection } from "react-native-ui-lib";
import * as Unicons from "@iconscout/react-native-unicons";
import { useTheme } from "styled-components";

interface VaultCardProps {
  vaultId: string;
  tokens: Array<any>;
}

export const VaultCard = ({ vaultId, tokens }: VaultCardProps) => {
  const { tokenPriceData, vaultsNfts } = useAppSelector(
    (state) => state.treasury
  );
  const [nftSectionOpen, setNftSectionOpen] = useState(true);
  const [tokenSectionOpen, setTokenSectionOpen] = useState(true);
  const theme = useTheme();

  const getVaultTotalValue = () => {
    let totalValue = 0;
    tokens.forEach((token) => {
      const coinGeckoId = token?.extensions?.coingeckoId;
      totalValue +=
        tokenPriceData[coinGeckoId]?.current_price *
          token.tokenAmount.uiAmount || 0;
    });
    return numeral(totalValue).format("$0,0");
  };

  console.log("NFTS for vault", vaultsNfts[vaultId]);

  const nfts = vaultsNfts[vaultId];

  return (
    <Container>
      <TitleContainer>
        <PublicKeyTextCopy publicKey={vaultId} fontSize={14} />
        <VaultValue>{getVaultTotalValue()}</VaultValue>
      </TitleContainer>

      {tokens.length > 0 && (
        <SectionContainer>
          <ExpandableSection
            top={false}
            expanded={tokenSectionOpen}
            sectionHeader={
              <SectionHeaderContainer>
                <Typography text="Tokens" size="h4" bold={true} shade="400" />
                {tokenSectionOpen ? (
                  <Unicons.UilAngleDown size="28" color={theme.gray[300]} />
                ) : (
                  <Unicons.UilAngleRight size="28" color={theme.gray[600]} />
                )}
              </SectionHeaderContainer>
            }
            onPress={() => setTokenSectionOpen(!tokenSectionOpen)}
          >
            <TokenList
              tokens={tokens}
              tokenPriceData={tokenPriceData}
              // hideUnknownTokens={true}
            />
          </ExpandableSection>
        </SectionContainer>
      )}

      {nfts.length > 0 && (
        <SectionContainer>
          <ExpandableSection
            top={false}
            expanded={nftSectionOpen}
            sectionHeader={
              <SectionHeaderContainer>
                <Typography text="Nfts" size="h4" bold={true} shade="400" />
                {nftSectionOpen ? (
                  <Unicons.UilAngleDown size="28" color={theme.gray[300]} />
                ) : (
                  <Unicons.UilAngleRight size="28" color={theme.gray[600]} />
                )}
              </SectionHeaderContainer>
            }
            onPress={() => setNftSectionOpen(!nftSectionOpen)}
          >
            <NftList nfts={nfts} />
          </ExpandableSection>
        </SectionContainer>
      )}
    </Container>
  );
};

const Container = styled.View`
  width: 100%%;
  margin-bottom: ${(props: any) => props.theme.spacing[3]};
  border-radius: 4px;
  background: ${(props: any) => props.theme.gray[800]};
  padding: ${(props: any) => props.theme.spacing[4]};
  flex-direction: column;
`;

const SectionContainer = styled.View`
  margin-bottom: ${(props: any) => props.theme.spacing[3]};
`;

const VaultValue = styled.Text`
color: ${(props: any) => props.theme.gray[100]}
  font-weight: bold;
  font-size: 24px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props: any) => props.theme.spacing[4]};
  margin-left: -${(props: any) => props.theme.spacing[2]}; // hidden padding of copy
`;

const SectionHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: ${(props) => props.theme.gray[700]};
  border-bottom-width: 1px;
`;
