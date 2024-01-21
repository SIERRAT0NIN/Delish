import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardHeader,
  CardFooter,
  Image,
} from "@nextui-org/react";
import NavBar from "./NavBar";

export default function RecipeModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button variant="faded" color="success" onPress={onOpen}>
          Open Modal
        </Button>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior={"inside"}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
                    <Card className="col-span-12 sm:col-span-4 h-[300px]">
                      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">
                          Example
                        </p>
                        <h4 className="text-white font-medium text-large">
                          Example Text
                        </h4>
                      </CardHeader>
                      <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="/images/card-example-4.jpeg"
                      />
                    </Card>
                    <Card className="col-span-12 sm:col-span-4 h-[300px]">
                      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">
                          Example Text
                        </p>
                        <h4 className="text-white font-medium text-large">
                          Example Text
                        </h4>
                      </CardHeader>
                      <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="/images/card-example-3.jpeg"
                      />
                    </Card>
                    <Card className="col-span-12 sm:col-span-4 h-[300px]">
                      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">
                          Example Text
                        </p>
                        <h4 className="text-white font-medium text-large">
                          Example Text
                        </h4>
                      </CardHeader>
                      <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="/images/card-example-2.jpeg"
                      />
                    </Card>
                    <Card
                      isFooterBlurred
                      className="w-full h-[300px] col-span-12 sm:col-span-5"
                    >
                      <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">
                          Example Text
                        </p>
                        <h4 className="text-black font-medium text-2xl">
                          Example Text
                        </h4>
                      </CardHeader>
                      <Image
                        removeWrapper
                        alt="Card example background"
                        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                        src="/images/card-example-6.jpeg"
                      />
                      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div>
                          <p className="text-black text-tiny">Example Text</p>
                          <p className="text-black text-tiny">Example Text</p>
                        </div>
                        <Button
                          className="text-tiny"
                          color="primary"
                          radius="full"
                          size="sm"
                        >
                          Example Text
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card
                      isFooterBlurred
                      className="w-full h-[300px] col-span-12 sm:col-span-7"
                    >
                      <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">
                          Example Text
                        </p>
                        <h4 className="text-white/90 font-medium text-xl">
                          Example Text
                        </h4>
                      </CardHeader>
                      <Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src="/images/card-example-5.jpeg"
                      />
                      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                          <Image
                            alt="Breathing app icon"
                            className="rounded-full w-10 h-11 bg-black"
                            src="/images/breathing-app-icon.jpeg"
                          />
                          <div className="flex flex-col">
                            <p className="text-tiny text-white/60">
                              Example Text
                            </p>
                            <p className="text-tiny text-white/60">
                              Example Text
                            </p>
                          </div>
                        </div>
                        <Button radius="full" size="sm">
                          Example Text
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
