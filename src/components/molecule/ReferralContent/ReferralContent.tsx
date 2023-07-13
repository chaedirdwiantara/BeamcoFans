import React, {useEffect, useState} from 'react';
import {Text, View, ViewStyle, Linking, TouchableOpacity} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import styles from './styles';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import {Button, Gap, SsuDivider, SsuInput} from '../../atom';
import {CheckCircleIcon, GiftIcon} from '../../../assets/icon';
import ReferralQRImage from '../../../assets/image/ReferralQR.image';
import {widthResponsive} from '../../../utils';
import {useTranslation} from 'react-i18next';
import {color} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import ReferralQRSuccessImage from '../../../assets/image/ReferralQRSuccess.image';
import SigninIcon from '../../../assets/icon/Signin.icon';

interface ReferralContentProps {
  isOnSetting?: boolean;
  containerStyle?: ViewStyle;
  onPress?: (refCode: string) => void;
  onSkip?: () => void;
  isError: boolean;
  errorMsg: string;
  isValidRef: boolean | null;
  refCode: string;
  setRefCode: (value: string) => void;
  referralFrom?: string | null;
  isScanning: boolean;
  setIsScanning: (value: boolean) => void;
  isScanSuccess: boolean;
  setIsScanSuccess: (value: boolean) => void;
  isScanned: boolean;
  setIsScanned: (value: boolean) => void;
  setIsScanFailed: (value: boolean) => void;
  isManualEnter: boolean;
  setIsManualEnter: (value: boolean) => void;
}

interface ActivatedProps {
  refCode?: string;
}

const titleToScan = 'Setting.ReferralQR.OnBoard.Title';
const titleActivated = 'Setting.ReferralQR.OnBoard.Activated';
const titleScanSuccess = 'Setting.ReferralQR.OnBoard.SuccessTitle';
const descriptionToScan = 'Setting.ReferralQR.OnBoard.Subtitle';
const descriptionScanSuccess = 'Setting.ReferralQR.OnBoard.SuccessDesc';
const dividerOnScan = 'Setting.ReferralQR.OnBoard.DividerOnScan';
const dividerOnManualEnter = 'Setting.ReferralQR.OnBoard.DividerOnManualEnter';
const referralAddedTitle = 'Setting.ReferralQR.OnBoard.ReferralAdded';
const BtnScan = 'Setting.ReferralQR.OnBoard.BtnScan';
const BtnManual = 'Setting.ReferralQR.OnBoard.BtnManual';
const friendReferral = 'Setting.ReferralQR.UseRefer.Text2';
const refCannotBeChanged = 'Setting.ReferralQR.UseRefer.Text3';

export const ReferralActivated: React.FC<ActivatedProps> = ({refCode}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.containerActivated}>
      <View style={styles.containerReferralCode}>
        <Text style={[Typography.Subtitle2, styles.textFriendRef]}>
          {t(friendReferral)}
        </Text>
        <View style={styles.containerCode}>
          <CheckCircleIcon />
          <Text style={[Typography.Heading6, styles.refCode]}>{refCode}</Text>
        </View>
      </View>
      <Text style={[Typography.Overline, styles.note]}>
        {t(refCannotBeChanged)}
      </Text>
    </View>
  );
};

export const ReferralContent: React.FC<ReferralContentProps> = ({
  isOnSetting,
  containerStyle,
  onPress,
  onSkip,
  isError,
  errorMsg,
  isValidRef,
  refCode,
  setRefCode,
  referralFrom,
  isScanning,
  setIsScanning,
  isScanSuccess,
  setIsScanSuccess,
  isScanned,
  setIsScanned,
  setIsScanFailed,
  isManualEnter,
  setIsManualEnter,
}) => {
  const {t} = useTranslation();
  const [focusInput, setFocusInput] = useState<string | null>(null);

  // Camera
  const devices = useCameraDevices();
  const device = devices.back;

  // Camera Handler
  async function getPermission() {
    const permission = await Camera.requestCameraPermission();

    if (permission === 'denied') {
      await Linking.openSettings();
    }
  }

  useEffect(() => {
    if (isScanning) {
      getPermission();
    }
    console.log('isscanning check:', isScanning);
  }, [isScanning]);

  useEffect(() => {
    if (isValidRef || referralFrom !== null) {
      setIsScanSuccess(true);
    } else if ((!isValidRef || referralFrom !== null) && isScanning) {
      setIsScanFailed(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidRef, referralFrom]);

  // QRCode
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);

  useEffect(() => {
    togleActiveState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodes]);

  useEffect(() => {
    if (onPress && refCode !== '' && isScanning) {
      onPress(refCode);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refCode]);

  const togleActiveState = async () => {
    if (barcodes && barcodes.length > 0 && isScanned === false) {
      setIsScanned(true);

      barcodes.forEach(async scannedBarcode => {
        if (
          scannedBarcode.rawValue !== '' &&
          scannedBarcode.rawValue !== undefined
        ) {
          setRefCode(scannedBarcode.rawValue);
        }
      });
    }
  };

  const handleScanning = () => {
    setIsScanning(true);
    setIsManualEnter(false);

    console.log('isscanning true :', isScanning);
  };

  const handleManualEnter = () => {
    setIsManualEnter(true);
    setIsScanning(false);

    console.log('isscanning false :', isScanning);
  };

  const handleFocusInput = (input: string | null) => {
    setFocusInput(input);
  };

  const SubmitIconComp = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress && onPress(refCode);
        }}>
        <SigninIcon stroke={Color.Neutral[10]} fill="white" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.root, containerStyle]}>
      {!isOnSetting ? (
        <>
          <View style={{width: 5}}>
            <Button
              label={t('Btn.Skip')}
              type="border"
              borderColor="transparent"
              textStyles={{fontSize: mvs(14), color: color.Success[400]}}
              onPress={() => {
                onSkip && onSkip();
              }}
            />
          </View>
          <Text style={[Typography.Subtitle2, styles.preTitle]}>
            Step 5 of 5
          </Text>
        </>
      ) : (
        ''
      )}
      <View style={styles.containerText}>
        <Text
          style={[
            isOnSetting ? Typography.Heading6 : Typography.Heading4,
            styles.title,
            {textAlign: 'center'},
          ]}>
          {(isScanSuccess || referralFrom !== null) && !isOnSetting
            ? t(titleScanSuccess)
            : isScanSuccess || referralFrom !== null
            ? t(titleActivated)
            : t(titleToScan)}
        </Text>
        {referralFrom === null && !isOnSetting ? (
          <Text
            style={[
              Typography.Subtitle2,
              styles.description,
              {textAlign: 'center'},
            ]}>
            {isScanSuccess ? t(descriptionScanSuccess) : t(descriptionToScan)}
          </Text>
        ) : (
          <Text />
        )}
      </View>
      {isScanning && referralFrom === null ? (
        <>
          <View style={styles.cameraContainer}>
            {device !== undefined ? (
              <Camera
                style={{flex: 1}}
                device={device}
                isActive={true}
                frameProcessor={frameProcessor}
                frameProcessorFps={5}
              />
            ) : (
              ''
            )}
          </View>
          <Gap height={32} />
        </>
      ) : (isScanSuccess || referralFrom !== null) && !isOnSetting ? (
        <>
          <ReferralQRSuccessImage />
        </>
      ) : referralFrom !== null && isOnSetting ? (
        ''
      ) : referralFrom === null && isOnSetting ? (
        <ReferralQRImage />
      ) : referralFrom === null && !isOnSetting ? (
        <ReferralQRImage />
      ) : (
        ''
      )}

      {isManualEnter && !isScanSuccess ? (
        <View style={styles.container}>
          <SsuInput.InputText
            value={refCode}
            isError={isError}
            placeholder={t('Setting.Referral.Title') || ''}
            errorMsg={errorMsg}
            rightIcon={true}
            rightIconComponent={<SubmitIconComp />}
            leftIcon={<GiftIcon />}
            fontColor={Color.Neutral[10]}
            borderColor={Color.Pink.linear}
            onChangeText={(newText: string) => setRefCode(newText)}
            onFocus={() => {
              handleFocusInput('refcode');
            }}
            onBlur={() => {
              handleFocusInput(null);
            }}
            isFocus={focusInput === 'refcode'}
          />
          <Gap height={24} />
        </View>
      ) : (
        ''
      )}

      {(isScanning || isManualEnter || isScanSuccess) && !isOnSetting ? (
        <>
          <SsuDivider
            containerStyle={{paddingHorizontal: widthResponsive(48)}}
            text={
              t(
                isScanning && !isScanSuccess
                  ? dividerOnScan
                  : isManualEnter && !isScanSuccess
                  ? dividerOnManualEnter
                  : referralAddedTitle,
              ) || ''
            }
          />
          <Gap height={16} />
        </>
      ) : (
        ''
      )}

      <View style={styles.container}>
        {!isScanning && !isScanSuccess ? (
          <>
            <Button
              label={t(BtnScan)}
              textStyles={{fontSize: mvs(14)}}
              containerStyles={{width: '100%'}}
              onPress={handleScanning}
            />
            <Gap height={16} />
          </>
        ) : (
          ''
        )}
        {!isManualEnter && !isScanSuccess ? (
          <>
            <Button
              label={t(BtnManual)}
              type="border"
              textStyles={{fontSize: mvs(14), color: color.Success[400]}}
              containerStyles={{width: '100%'}}
              onPress={handleManualEnter}
            />
            <Gap height={4} />
          </>
        ) : (
          ''
        )}
        <View style={styles.container}>
          {isScanSuccess || referralFrom !== null ? (
            <>
              <ReferralActivated refCode={referralFrom || refCode} />
            </>
          ) : (
            ''
          )}
        </View>
      </View>
    </View>
  );
};
