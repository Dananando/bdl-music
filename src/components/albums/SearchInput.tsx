import { Box, Input, InputProps } from "@chakra-ui/react";

interface SearchInputProps extends Omit<InputProps, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({
  value,
  onChange,
  ...props
}: SearchInputProps) => {
  return (
    <Box position="relative">
      <Input
        placeholder="Search albums or artists..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="lg"
        {...props}
      />
    </Box>
  );
};
