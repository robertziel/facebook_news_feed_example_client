import React from 'react';
import { FormattedMessage } from 'react-intl';

import LanguageToggle from 'components/LanguageToggle/index';

import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <div className="message">
          <FormattedMessage
            {...messages.authorMessage}
            values={{
              author: (
                <a href="https://robertz.co" target="_blank">
                  Robert Zieliński
                </a>
              ),
            }}
          />
        </div>
        <div className="footer-right">
          <LanguageToggle />
        </div>
      </section>
    </Wrapper>
  );
}

export default Footer;
