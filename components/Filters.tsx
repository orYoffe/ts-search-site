import { useState } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Flex,
  Stack,
  Checkbox,
  CheckboxGroup,
  HStack,
} from "@chakra-ui/react";

interface Props {
  specialities: string[];
  submit: (name: string, specialities: string[]) => void;
}

function Filters({ submit, specialities }: Props) {
  const [value, setValue] = useState("");
  const [specialitiesValue, setSpecialities] = useState<string[]>([]);

  return (
    <Stack spacing="2" m={8}>
      <Flex align="center" justify="flex-start" direction="row" wrap="wrap">
        {/* <FormControl isInvalid={errors.name} m={1}>
            <FormLabel htmlFor="name">Name</FormLabel>
            // <Input name="name" placeholder="Name" ref={register()} />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl> */}
        <Input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            submit(event.target.value, specialitiesValue);
          }}
          placeholder="Here is a sample placeholder"
          size="sm"
        />
        <FormControl
          // isInvalid={errors.language}
          m={1}
        >
          <FormLabel htmlFor="specialities">Specialities</FormLabel>
          {specialities && (
            <CheckboxGroup colorScheme="green" defaultValue={[]}>
              <HStack>
                {specialities.map((speciality, index) => {
                  const isChecked = specialitiesValue.includes(speciality);
                  return (
                    <Checkbox
                      data-testid={`checkbox_${speciality}`}
                      key={`${speciality} ${index}`}
                      isChecked={isChecked}
                      onChange={() => {
                        const list = specialitiesValue.slice(0);
                        if (isChecked) {
                          const index = list.indexOf(speciality);
                          if (index > -1) {
                            list.splice(index, 1);
                          } else {
                            return;
                          }
                        } else {
                          list.push(speciality);
                        }
                        setSpecialities(list);
                        submit(value, list);
                      }}
                    >
                      {speciality}
                    </Checkbox>
                  );
                })}
              </HStack>
            </CheckboxGroup>
          )}
        </FormControl>
      </Flex>
    </Stack>
  );
}

export default Filters;
