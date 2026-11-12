import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        {/* <p className="hero__subtitle">{siteConfig.tagline}</p> */}
        <div>
          <a
            className="button button--secondary button--lg"
            href="/telecom_industriels/docs/Theorie/reseau-informatique"
          >
            Commencer le cours
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Introduction`}
      description="Système industriels connectés">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
        <div className="text--left padding-horiz--md">
          <h2>Introduction aux systèmes industriels connectés</h2>
          <p>
            Ce cours propose une introduction aux réseaux informatiques et industriels, à leur architecture, 
            à leur configuration et à leur sécurisation. 
            Vous découvrirez les principaux concepts des réseaux Ethernet et TCP/IP, l'adressage IPv4, 
            les protocoles de communication industriels ainsi que les enjeux spécifiques de la sécurité 
            dans les environnements industriels.           
            Des démonstrations et des exercices pratiques permettront de mettre ces notions en relation 
            avec des équipements industriels.
          </p>

          <h3>Objectifs</h3>
          <p>
            Au fil des séances, vous serez amenés à :
          </p>
          <ul>
            <li>Comprendre les principes de fonctionnement d'un réseau informatique et industriel.</li>
            <li>Identifier les principaux équipements et éléments constitutifs d'un réseau.</li>
            <li>Comprendre les modèles OSI et TCP/IP.</li>
            <li>Configurer et interpréter un adressage IPv4 simple.</li>
            <li>Comprendre les principes de communication entre équipements industriels.</li>
            <li>Identifier les principaux protocoles de communication industriels.</li>
            <li>Comprendre les risques liés à la sécurité industrielle.</li>
            <li>Proposer une architecture réseau industrielle simple et cohérente.</li>
          </ul>

          <h3>Programme des séances</h3>
          <ol>
            <li>
              <strong>Introduction aux réseaux informatiques et industriels</strong><br />
                Présentation des modèles de référence des réseaux informatiques (OSI et TCP/IP) 
                et des modèles d'organisation propres aux systèmes industriels, 
                notamment la pyramide CIM.            </li>
            <li>
              <strong>Adressage IPv4 et communication réseau</strong><br />
              Étude de l'adressage IPv4, des masques de sous-réseau et 
              des principes de segmentation d'un réseau en sous-réseaux.
            </li>
            <li>
              <strong>Protocoles de communication industriels</strong><br />
              Présentation des principaux protocoles de communication utilisés dans l'industrie, 
              tels que Modbus TCP, Profinet et OPC UA, ainsi que de leurs applications.
            </li>
            <li>
              <strong>Sécurité industrielle</strong><br />
               Identification des principales menaces pesant sur les réseaux industriels 
               et découverte des méthodes permettant de sécuriser les équipements et les communications.
            </li>
            <li>
              <strong>Conception d'une architecture réseau industrielle</strong><br />
              Mise en pratique des connaissances acquises à travers la conception d'une architecture 
              réseau intégrant différents équipements et protocoles de 
              communication industriels.
            </li>
            <li>
              <strong>Évaluation</strong><br />
              Vérification des connaissances théoriques et des compétences pratiques 
              acquises au cours des différentes séances.
            </li>
          </ol>

          <p>
            Afin de faciliter la compréhension des mécanismes de communication réseau, 
            des analyses de trafic seront réalisées à l'aide du logiciel Wireshark, 
            notamment à partir de captures de trames réseau.
          </p>
          <p>
            Explorez, expérimentez et posez des questions pour tirer le meilleur parti de ces séances.
          </p>
        </div>
      </main>
    </Layout>
  );
}
