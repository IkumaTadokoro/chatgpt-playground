import { Outlet } from "react-router-dom";
import { Button } from "../utils/Button/Button";
import useChatGpt from "../utils/ChatGpt/useChatGpt";
import { Form } from "../utils/Form";
import { InputField } from "../utils/Form/InputField";
import Header from "./Header";
import Navigation from "./Navigation";

export default function AppFrame() {
  const { setApiKey } = useChatGpt();

  return (
    <>
      <Header siteName="ChatGPT API Playground" />
      <aside
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-zinc-900 border-r border-zinc-800 translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-5 pb-4 overflow-y-auto bg-zinc-900">
          <Form<{ openApiKey: string }>
            onSubmit={async (values) => {
              setApiKey(values.openApiKey);
            }}
            className="mb-12"
          >
            {({ register, formState }) => (
              <>
                <InputField
                  label="OpenAI API Key"
                  type="password"
                  error={formState.errors.openApiKey}
                  registration={register("openApiKey")}
                />
                <Button type="submit" size="sm">
                  設定する （反応なし🙏）
                </Button>
              </>
            )}
          </Form>
          <Navigation />
        </div>
      </aside>
      <div className="p-4 ml-64">
        <div className="p-4 mt-14">
          <Outlet />
        </div>
      </div>
    </>
  );
}
