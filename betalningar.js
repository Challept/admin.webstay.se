let connectedAccountId = null;

const signUpButton = document.getElementById("sign-up-button");
signUpButton.onclick = async () => {
  document.getElementById("dev-callout").classList.remove("hidden");
  document.getElementById("creating-connected-account").classList.remove("hidden");
  document.getElementById("error").classList.add("hidden");
  document.getElementById("sign-up-button").classList.add("hidden");

  fetch("/account", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((json) => {
      const {account, error} = json;

      if (error) {
        document.getElementById("error").classList.remove("hidden");
        document.getElementById("sign-up-button").classList.remove("hidden");
        document.getElementById("creating-connected-account").classList.add("hidden");
        document.getElementById("dev-callout").classList.add("hidden");
        return;
      }

      connectedAccountId = account;

      const connectedAccountIdElement = document.getElementById("connected-account-id");
      connectedAccountIdElement.innerHTML = `Your connected account ID is: <code class="bold">${connectedAccountId}</code>`;
      connectedAccountIdElement.classList.remove("hidden");

      document.getElementById("add-information-button").classList.remove("hidden");
      document.getElementById("creating-connected-account").classList.add("hidden");
      document.getElementById("title").classList.add("hidden");
      document.getElementById("subtitle").classList.add("hidden");
      document.getElementById("add-information-title").classList.remove("hidden");
      document.getElementById("add-information-subtitle").classList.remove("hidden");
    });
};

const addInformationButton = document.getElementById("add-information-button");
addInformationButton.onclick = async () => {
  document.getElementById("adding-onboarding-information").classList.remove("hidden");
  document.getElementById("error").classList.add("hidden");
  document.getElementById("add-information-button").classList.add("hidden");
  fetch(`/account/${connectedAccountId}`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((json) => {
      const {error} = json;

      if (error) {
        document.getElementById("error").classList.remove("hidden");
        document.getElementById("adding-onboarding-information").classList.add("hidden");
        document.getElementById("add-information-button").classList.remove("hidden");
        return;
      }

      document.getElementById("example-form").classList.remove("hidden");
      document.getElementById("onboarding-has-begun").classList.remove("hidden");
      document.getElementById("adding-onboarding-information").classList.add("hidden");
    });
};
