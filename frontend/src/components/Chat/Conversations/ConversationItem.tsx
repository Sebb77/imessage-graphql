import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import { NextRouter } from "next/router";
import React from "react";
import {
  ConversationFE,
  ConversationParticipant,
} from "../../../graphql/operations/conversations";

interface ConversationItemProps {
  conversation: ConversationFE;
  router: NextRouter;
  conversationId: string;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  router,
  conversationId,
}) => {
  const formatUsernames = (
    participants: Array<ConversationParticipant>
  ): string => {
    const usernames = participants.map(
      (participant) => participant.user.username
    );

    return usernames.join(", ");
  };

  return (
    <Stack
      key={conversation.id}
      direction="row"
      spacing={4}
      p={4}
      cursor="pointer"
      borderRadius={4}
      bg={conversation.id === conversationId ? "whiteAlpha.200" : "none"}
      _hover={{ bg: "whiteAlpha.200" }}
      onClick={() =>
        router.push({ query: { conversationId: conversation.id } })
      }
    >
      <Avatar />
      <Flex justify="space-between" width="80%">
        <Flex direction="column" width="70%">
          <Text
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {formatUsernames(conversation.participants)}
          </Text>
          {conversation.latestMessage && (
            <Text color="whiteAlpha.700">
              {conversation.latestMessage.body}
            </Text>
          )}
        </Flex>
        <Text color="whiteAlpha.700">
          {moment(conversation.updatedAt).format("LT")}
        </Text>
      </Flex>
    </Stack>
  );
};
export default ConversationItem;
