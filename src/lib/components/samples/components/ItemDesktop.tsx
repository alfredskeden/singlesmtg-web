import {
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tooltip,
  Spinner,
  Tr,
  Td,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import dayjs from "dayjs";
import { Product } from "../Item";
import ImagesMTG from "./ImagesMTG";
import LinksMTG from "./LinksMTG";

type Props = {
  nameOG: string;
  loading: boolean;
  product: Product;
  index: number;
  removeItem: (index: number) => void;
};

const ItemDesktop = ({
  nameOG,
  loading,
  product,
  index,
  removeItem,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, avail, lowestPrice, lowestHref, imageId, totalSearches } =
    product;

  return (
    <>
      <Tr>
        {loading ? (
          <>
            <Td />
            <Td />
            <Td>{nameOG}</Td>
            <Td>
              <Spinner />
            </Td>
            <Td />
            <Td />
          </>
        ) : (
          <>
            <Td>({totalSearches})</Td>
            <Td>
              <Tooltip
                placement="auto"
                hasArrow
                label={
                  <Flex position="relative">
                    <ImagesMTG name={name} imageId={imageId} />
                  </Flex>
                }
              >
                <Flex position="relative" height="30px">
                  <ImagesMTG
                    name={name}
                    imageId={imageId}
                    type="grid"
                    foil={false}
                  />
                </Flex>
              </Tooltip>
            </Td>
            <Td>
              <LinksMTG
                href={lowestHref ?? ""}
                label={name}
                isExternal={true}
              />
            </Td>
            <Td isNumeric>
              <Text color={!avail ? "red.300" : "green.300"}>{avail} pc</Text>
            </Td>
            <Td isNumeric>
              <Button onClick={onOpen} variant="link">
                <u>{!lowestPrice ? "Not set" : `~ ${lowestPrice} kr`}</u>
              </Button>
            </Td>
            <Td isNumeric>
              {" "}
              <IconButton
                onClick={() => removeItem(index)}
                onKeyUp={(e) => e.key === "Enter" && removeItem(index)}
                icon={<AiOutlineDelete />}
                size="xs"
                aria-label="Remove item from list"
              />
            </Td>
          </>
        )}
      </Tr>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name} info</ModalHeader>
          <TableContainer>
            <Table variant="striped" colorScheme="black">
              <Thead>
                <Tr>
                  <Th>Img</Th>
                  <Th>Name</Th>
                  <Th isNumeric>Stock</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Buy Price</Th>
                  <Th>Recent in store</Th>
                </Tr>
              </Thead>
              <Tbody>
                {product.items?.map((item) => {
                  return (
                    <Tr key={item.id}>
                      <Td>
                        <Tooltip
                          placement="auto"
                          hasArrow
                          label={
                            <Flex position="relative">
                              <ImagesMTG
                                name={item.name}
                                imageId={item.imageId}
                              />
                            </Flex>
                          }
                        >
                          <Flex position="relative" height="30px">
                            <ImagesMTG
                              name={item.name}
                              imageId={item.imageId}
                              type="grid"
                              foil={false}
                            />
                          </Flex>
                        </Tooltip>
                      </Td>
                      <Td>
                        <LinksMTG
                          href={item.URL}
                          label={item.name}
                          isExternal={true}
                        />
                      </Td>
                      <Td isNumeric>
                        <Text
                          color={!item.itemsAvail ? "red.300" : "green.300"}
                        >
                          {item.itemsAvail}
                        </Text>
                      </Td>
                      <Td isNumeric>{item.price ?? 0}</Td>
                      <Td isNumeric>{item.buyInPrice}</Td>
                      <Td>{dayjs(item.RecentByStore).format("YYYY-MMM-DD")}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ItemDesktop;
