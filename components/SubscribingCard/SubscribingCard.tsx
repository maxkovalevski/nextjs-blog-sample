import { InfoCard } from 'nocturnal-ui-react';
import React, { FC } from 'react';

import { useConvertkitEmailSubscription } from '../../hooks';
import { icons } from '../../icons';
import { Icon } from '../Icon';

import styles from './subscribing-card.module.css';

export const SubscribingCard: FC = () => {
  const {
    FORM_URL,
    handleSubmit,
    handleChangeEmail,
    email,
    status,
  } = useConvertkitEmailSubscription({ endpoint: process.env.CONVERTKIT_ENDPOINT || '' });

  return (
    <InfoCard variant="colorful">
      <div className={styles.dark}>
        <h4 className="monospace">
          <span>Join the Mailing List </span>
          <Icon src={icons.emojiEnvelope.src} widthSize="25px" />
        </h4>
        <div>
          <form onSubmit={handleSubmit} action={FORM_URL} method="post">
            <input
              aria-label="Your email"
              type="email"
              name="email_address"
              placeholder="Email address"
              value={email}
              onChange={handleChangeEmail}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {status !== 'initial' && (
            <div>
              {status === 'success' && (
                <div className={styles.resultSuccess}>
                  <Icon src={icons.emojiSparkles.src} widthSize="20px" />
                  <i>Please go confirm your subscription!</i>
                </div>
              )}
              {status === 'error' && (
                <div className={styles.resultError}>
                  <Icon src={icons.emojiPoliceCarLight.src} widthSize="20px" />
                  <i>Oops, Something went wrong! Try again.</i>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </InfoCard>
  );
}

