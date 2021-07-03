import React from "react";
import { fireEvent, screen, render } from "@testing-library/react";
import TagsInput from "./TagsInput";

describe("TagsInput component", () => {
  beforeEach(jest.clearAllMocks);

  it("deve renderizar duas tags", async () => {
    // renderizacao do componente
    const { container } = render(<TagsInput name="emails" label="emails" />);

    // construcao do cenário: o usuário aqui está preenchendo
    // o input com dois e-mails válidos, separados por ;
    const value = "teste1@teste.com;teste2@teste.com;";
    const field = screen.getByLabelText("emails");
    fireEvent.input(field, { target: { value } });
    fireEvent.keyDown(field, { key: "Enter", code: 9, charCode: 9 });
    fireEvent.blur(field);

    // o teste deverá quebrar se os dois componentes abaixo não
    // existirem
    screen.getByText("teste1@teste.com");
    screen.getByText("teste2@teste.com");
  });

  it("deve deletar a útima tag criada ao pressionar o botão de backspace", async () => {
    const { container } = render(<TagsInput name="emails" label="emails" />);

    // construcao do cenário: o usuário aqui está preenchendo
    // o input com dois e-mails válidos, separados por ;
    const value = "teste1@teste.com;teste2@teste.com;";
    const field = screen.getByLabelText("emails");
    fireEvent.input(field, { target: { value } });
    fireEvent.keyDown(field, { key: "Enter", code: 9, charCode: 9 });
    fireEvent.blur(field);
    fireEvent.keyDown(field, { key: "Backspace", code: 8, charCode: 8 });
    fireEvent.blur(field);
    // o teste deverá quebrar se o último elemento
    // não tiver sido deletado
    screen.getAllByText("teste1@teste.com");
    expect(screen.queryByText("teste2@teste.com")).toBeNull();
  });
});
