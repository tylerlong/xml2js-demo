import { expect, test } from 'vitest';
import xml2js from 'xml2js';

const xmlStr =
  '<Msg><Hdr SID="36523388888888" Req="" Cmd="9" From="#1534016@sip.ringcentral.com:5060" To="17206668888*11115@sip.ringcentral.com:5060"/><Bdy Cln="802388888888" Phn="WIRELESS CALLER" Nm="+16506668888" ExtNfo="" Resp="0" Sts="0"/></Msg>';

const json = {
  Msg: {
    Hdr: {
      $: {
        SID: '36523388888888',
        Req: '',
        Cmd: '9',
        From: '#1534016@sip.ringcentral.com:5060',
        To: '17206668888*11115@sip.ringcentral.com:5060',
      },
    },
    Bdy: {
      $: {
        Cln: '802388888888',
        Phn: 'WIRELESS CALLER',
        Nm: '+16506668888',
        ExtNfo: '',
        Resp: '0',
        Sts: '0',
      },
    },
  },
};

test('parse XML', async () => {
  const parser = new xml2js.Parser({
    explicitArray: false,
  });
  const result = await parser.parseStringPromise(xmlStr);
  expect(result).toMatchObject(json);
});

test('build XML', async () => {
  const builder = new xml2js.Builder({
    renderOpts: {
      pretty: false,
    },
    headless: true,
  });
  const xml = builder.buildObject(json);
  expect(xml).toBe(xmlStr);
});
