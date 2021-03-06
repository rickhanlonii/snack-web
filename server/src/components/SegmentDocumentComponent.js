/* @flow */

import React from 'react';

type Props = {
  splitTestSettings: Object,
};

export default class SegmentDocumentComponent extends React.Component<Props> {
  render() {
    /* $FlowFixMe */
    const projectApiKey: string = process.env.SNACK_SEGMENT_KEY;
    let markup = { __html: this._getAnalyticsScript(projectApiKey) };
    return <script dangerouslySetInnerHTML={markup} />;
  }

  _getAnalyticsScript(projectApiKey: string): string {
    return `
!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)return;else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
    analytics.load('${projectApiKey}');
    analytics.page();
    analytics.identify({
      user_properties: ${JSON.stringify(this.props.splitTestSettings || {})}
    });}}();
`.replace(/\n/g, '');
  }
}
