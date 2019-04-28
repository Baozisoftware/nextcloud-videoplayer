<?php


OCP\Util::addStyle( 'nextcloud-videoplayer', 'style' );
OCP\Util::addscript( 'nextcloud-videoplayer', 'viewer');

$csp = new \OCP\AppFramework\Http\ContentSecurityPolicy();
$csp->addAllowedWorkerSrcDomain('\'self\'');
$csp->addAllowedWorkerSrcDomain('blob:');
$csp->addAllowedMediaDomain("blob:");
$cspManager = \OC::$server->query(\OCP\Security\IContentSecurityPolicyManager::class);
$cspManager->addDefaultPolicy($csp);