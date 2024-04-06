import { supabase } from "./supabase";
import React, { useState, useEffect, use } from "react";

import {
  faGoogle,
  faGithub,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * custom ui box login
 *
 */
export async function BoxLogin(props: {
  showModal?: boolean;
  setShowModal?: (showModal: boolean) => void;
}) {
  const [userIdentities, setUserIdentities] = useState([]);

  // social user linked
  const getInforSocial = async () => {
    const resIdentities = await supabase.auth.getUserIdentities();
    const identities = resIdentities.data?.identities;
    const socialOauth = identities?.reduce((acc, item) => {
      acc[item.provider] = true;
      return acc;
    }, {});

    setUserIdentities(socialOauth);
  };

  // handle close ui box login
  const handleClickOutside = (event) => {
    if (props.showModal && !event.target.closest(".formsocial")) {
      props.setShowModal(false);
    }
  };

  useEffect(() => {
    getInforSocial();
  }, []);

  // handle for close ui box login
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [props.showModal]);

  // handle identity for user
  const identitySupabase = async (social) => {
    localStorage.setItem("socalLoginNow", social);
    await supabase.auth.linkIdentity({
      provider: social,
    });
  };

  return (
    <>
      {userIdentities ? ( // reload ui when check userIdentities
        <>
          <div className="boxLogin">
            <div className="formsocial">
              <div className="title">Log In</div>
              <div className="social">
                <div className="iconsocial">
                  <FontAwesomeIcon
                    icon={faGoogle}
                    onClick={() =>
                      !userIdentities["google"] && identitySupabase("google")
                    }
                  />
                  {userIdentities["google"] && (
                    <div className="statussocial">(already logged in)</div>
                  )}
                </div>

                <div className="iconsocial">
                  <FontAwesomeIcon
                    icon={faGithub}
                    onClick={() =>
                      !userIdentities["github"] && identitySupabase("github")
                    }
                  />
                  {userIdentities["github"] && (
                    <div className="statussocial">(already logged in)</div>
                  )}
                </div>

                <div className="iconsocial">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    onClick={() =>
                      !userIdentities["facebook"] &&
                      identitySupabase("facebook")
                    }
                  />
                  {userIdentities["facebook"] && (
                    <div className="statussocial">(already logged in)</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div></div>
        </>
      )}
    </>
  );
}
