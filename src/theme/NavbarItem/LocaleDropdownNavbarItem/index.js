import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';
import {mergeSearchStrings, useHistorySelector} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import IconLanguage from '@theme/Icon/Language';
import styles from './styles.module.css';

const localizedDocPaths = {
  'Herramientas/lista-herramientas': {
    es: 'Herramientas/lista-herramientas',
    en: 'tools/tool-list',
  },
  'Importar de otros juegos/importar-mapas-garrys-mod': {
    es: 'Importar de otros juegos/importar-mapas-garrys-mod',
    en: 'import-from-other-games/import-garrys-mod-maps',
  },
  'M2/editar-un-archivo-m2': {
    es: 'M2/editar-un-archivo-m2',
    en: 'm2/edit-m2-file',
  },
  'Noggit/controles-basicos-noggit': {
    es: 'Noggit/controles-basicos-noggit',
    en: 'noggit/basic-controls',
  },
  'Noggit/instalacion-noggit-epsilon': {
    es: 'Noggit/instalacion-noggit-epsilon',
    en: 'noggit/install-noggit-epsilon',
  },
  'Noggit/mapas-custom-noggit': {
    es: 'Noggit/mapas-custom-noggit',
    en: 'noggit/custom-maps',
  },
  'WMO/Crear-un-WMO-custom': {
    es: 'WMO/Crear-un-WMO-custom',
    en: 'wmo/create-custom-wmo',
  },
  'WMO/Uso-basico-de-Blender-para-WMO': {
    es: 'WMO/Uso-basico-de-Blender-para-WMO',
    en: 'wmo/blender-basics-for-wmo',
  },
};

export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  queryString,
  ...props
}) {
  const {
    siteConfig,
    i18n: {currentLocale, locales, localeConfigs},
  } = useDocusaurusContext();
  const {pathname} = useLocation();
  const search = useHistorySelector((history) => history.location.search);
  const hash = useHistorySelector((history) => history.location.hash);

  const currentBaseUrl = siteConfig.baseUrl;
  const currentPath = pathname.startsWith(currentBaseUrl)
    ? pathname.slice(currentBaseUrl.length)
    : pathname;
  let normalizedPath = currentPath.replace(/^\/+|\/+$/g, '');
  try {
    normalizedPath = decodeURIComponent(normalizedPath);
  } catch {
    // Keep the original pathname if it contains an invalid escape sequence.
  }

  const localeItems = locales.map((locale) => {
    const localeConfig = localeConfigs[locale];
    const matchingDocPaths = Object.values(localizedDocPaths).find(
      (docPaths) =>
        docPaths.es === normalizedPath || docPaths.en === normalizedPath,
    );
    const localizedPath = matchingDocPaths?.[locale] ?? normalizedPath;
    const baseURL = `${localeConfig.url === siteConfig.url ? '' : localeConfig.url}${localeConfig.baseUrl}${localizedPath}`;
    const finalSearch = mergeSearchStrings(
      [search, queryString],
      'append',
    );

    return {
      label: localeConfig.label,
      lang: localeConfig.htmlLang,
      to: `${localeConfig.url === siteConfig.url ? 'pathname://' : ''}${baseURL}${finalSearch}${hash}`,
      target: '_self',
      autoAddBaseUrl: false,
      className:
        locale === currentLocale
          ? mobile
            ? 'menu__link--active'
            : 'dropdown__link--active'
          : '',
    };
  });

  const dropdownLabel = mobile
    ? translate({
        message: 'Languages',
        id: 'theme.navbar.mobileLanguageDropdown.label',
        description: 'The label for the mobile language switcher dropdown',
      })
    : localeConfigs[currentLocale].label;

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={
        <>
          <IconLanguage className={styles.iconLanguage} />
          {dropdownLabel}
        </>
      }
      items={[
        ...(dropdownItemsBefore ?? []),
        ...localeItems,
        ...(dropdownItemsAfter ?? []),
      ]}
    />
  );
}
