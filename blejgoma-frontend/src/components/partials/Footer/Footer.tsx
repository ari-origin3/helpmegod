import cs from "classnames";
import { Link, NavLink } from "react-router-dom";
import { Container } from "reactstrap";

import { useUIContext } from "../../../lib/context/UIContext/UIContext";
import { Icon } from "../../shared/Icon/Icon";
import { ReactComponent as LogoIcon } from "../../../assets/images/logo-white.svg";
import { useSubscribeMutation } from "../../../graphql/generated/generated";
import { useToast } from "../../../lib/hooks/useToast";
import { useSubscribeFormik } from "../../../lib/hooks/formik/useSubscribeFormik";
import { useRouter } from "../../../lib/hooks/useRouter";

//styles
import "./Footer.scss";

interface Props {
  className?: string;
}

const year = new Date().getFullYear();
export const Footer = (props: Props) => {
  const { addToast } = useToast();
  const uiCtx = useUIContext();
  const router = useRouter();
  const [subscribeMutation] = useSubscribeMutation();

  const toggleMenu = () => {
    if (!uiCtx.menuOpen) {
      return;
    }
    uiCtx.setMenuOpen((prev) => false);
  };

  const formik = useSubscribeFormik({
    onSubmit: async (value, formikHelpers) => {
      try {
        const res = await subscribeMutation({
          variables: {
            email: value.email,
          },
        });
        if (!res) {
          return;
        }
        addToast(res.data?.mailchimpSubscription?.message, {
          appearance: "success",
        });
      } catch (e) {
        addToast("Një problem u shfaq gjatë regjistrimit, provoni më vonë", {
          appearance: "error",
        });
      } finally {
        formikHelpers.resetForm();
      }
    },
  });
  return (
    <Container>
      <div className={cs("Footer", props.className)}>
        <div className="Footer__grid">
          <div
            className="Footer__logo"
            onClick={() => router.history.push("/")}
          >
            <LogoIcon />
          </div>

          <div className="Footer__subscribe">
            NA NDIQNI DHE INFORMOHUNI PËR MË TË REJAT
            <div className="Footer__input">
              <form onSubmit={formik.handleSubmit}>
                <input
                  id="email"
                  name="email"
                  placeholder="Adresa e E-mail-it"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <button className="Footer__input_button">
                  <Icon className="Footer__input_icon" icon="arrow-back" />
                </button>
                {formik.errors.email && (
                  <p className="Footer__input_error">{formik.errors.email}</p>
                )}
              </form>
            </div>
          </div>

          <div className="Footer__navigation">
            <p className="Footer__heading">BlejGoma</p>

            <ul className="Footer__nav_list">
              <li>
                <NavLink to="/contact" onClick={() => toggleMenu()}>
                  Na kontaktoni
                </NavLink>
              </li>
              <li>
                <NavLink to="/about-us" onClick={() => toggleMenu()}>
                  Rreth nesh
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms-of-use" onClick={() => toggleMenu()}>
                  Kushtet e përdorimit
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" onClick={() => toggleMenu()}>
                  FAQ
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="Footer__socials">
            <p className="Footer__heading">Na ndiqni në</p>
            <div className="Footer__icons">
              <Link
                to={{
                  pathname:
                    "https://www.facebook.com/Blejgoma-105708398501553/",
                }}
                target="_blank"
              >
                <Icon
                  className="Footer__social_icon"
                  icon="facebook"
                  onClick={() => toggleMenu()}
                />
              </Link>

              <Link
                to={{ pathname: "https://www.instagram.com/blejgoma/" }}
                target="_blank"
              >
                <Icon
                  className="Footer__social_icon"
                  icon="instagram"
                  onClick={() => toggleMenu()}
                />
              </Link>

              <Link
                to={{ pathname: "https://www.linkedin.com/company/blejgoma/" }}
                target="_blank"
              >
                <Icon
                  className="Footer__social_icon"
                  icon="linkedin"
                  onClick={() => toggleMenu()}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="Footer__copyrights">
          {year} © blejgoma.com. Të gjitha të drejtat e rezervuara.
        </div>
      </div>
    </Container>
  );
};
