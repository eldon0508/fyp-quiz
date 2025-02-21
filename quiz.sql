-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2025 at 01:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `question_id` bigint(20) UNSIGNED NOT NULL,
  `answer_text` longtext NOT NULL,
  `rate` int(11) NOT NULL,
  `best_answer` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `answer_text`, `rate`, `best_answer`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'Click the link immediately and follow the instructions.', 60, 0, '2025-02-20 21:14:03', '2025-02-20 23:48:20', NULL),
(2, 1, 'Call your bank directly using a known, trusted number to verify the email\'s legitimacy.', 10, 1, '2025-02-20 21:14:12', '2025-02-20 23:48:29', NULL),
(3, 1, 'Forward the email to your bank\'s security department.', 20, 0, '2025-02-20 21:14:30', '2025-02-20 23:48:37', NULL),
(4, 1, 'Reply to the email asking for more information.', 40, 0, '2025-02-20 21:14:39', '2025-02-20 23:48:50', NULL),
(5, 2, 'Provide them with your password as they are from IT.', 70, 0, '2025-02-20 21:21:57', '2025-02-20 23:54:31', NULL),
(6, 2, 'Ask for their employee ID and call the IT department directly using a known, trusted number to verify their identity.', 5, 1, '2025-02-20 21:22:05', '2025-02-20 23:54:39', NULL),
(7, 2, 'Tell them you will call them back and then hang up.', 15, 0, '2025-02-20 21:22:51', '2025-02-20 23:52:03', NULL),
(8, 2, 'Ask them a security question to verify their identity.', 45, 0, '2025-02-20 21:22:58', '2025-02-20 23:54:51', NULL),
(9, 3, 'Plug it into your computer to see what\'s on it.', 70, 0, '2025-02-20 21:24:40', '2025-02-20 23:56:59', NULL),
(10, 3, 'Turn it in to your IT department or security team.', 5, 1, '2025-02-20 21:24:48', '2025-02-20 21:24:48', NULL),
(11, 3, 'Try to find the owner by checking the files on the drive.', 55, 0, '2025-02-20 21:24:59', '2025-02-20 23:57:08', NULL),
(12, 3, 'Plug it into a spare, isolated computer that isn\'t connected to your network.', 30, 0, '2025-02-20 21:26:52', '2025-02-20 23:57:14', NULL),
(13, 4, 'Provide your phone number as it\'s from a friend.', 75, 0, '2025-02-20 21:30:46', '2025-02-21 00:01:17', NULL),
(14, 4, 'Contact your friend through a different channel to verify the request.', 10, 1, '2025-02-20 21:30:54', '2025-02-20 21:30:54', NULL),
(15, 4, 'Ask them a few personal questions only your friend would know to confirm their identity.', 35, 0, '2025-02-20 21:31:02', '2025-02-21 00:01:31', NULL),
(16, 4, 'Ask them for more details about the \"special offer.\"', 55, 0, '2025-02-20 21:31:12', '2025-02-21 00:01:43', NULL),
(17, 5, 'I use a unique, strong password for every online account, generated and stored by a password manager.', 10, 1, '2025-02-20 21:32:50', '2025-02-21 00:10:00', NULL),
(18, 5, 'I use a few different passwords across most of my accounts, trying to make them somewhat complex.', 25, 0, '2025-02-20 21:32:59', '2025-02-21 00:10:48', NULL),
(19, 5, 'I use the same password for most or all of my online accounts.', 60, 0, '2025-02-20 21:33:05', '2025-02-21 00:05:41', NULL),
(20, 5, 'I create passwords that are easy for me to remember, often using personal information or common words, sometimes with slight modifications.', 35, 0, '2025-02-20 21:33:13', '2025-02-21 00:10:41', NULL),
(21, 6, 'ASafePassword', 65, 0, '2025-02-20 21:37:58', '2025-02-21 00:18:50', NULL),
(22, 6, 'x%4#qR1!z9pL', 10, 1, '2025-02-20 21:38:07', '2025-02-20 21:38:07', NULL),
(23, 6, 'SuperLongPasswordSoNoOneCouldGuessIt', 55, 0, '2025-02-20 21:38:13', '2025-02-21 00:19:07', NULL),
(24, 6, 'P@$$wOrd!', 40, 0, '2025-02-20 21:38:39', '2025-02-20 21:38:39', NULL),
(25, 7, 'I immediately change the password for that account and any other accounts where I used the same password.', 10, 1, '2025-02-20 21:42:32', '2025-02-20 21:42:32', NULL),
(26, 7, 'I only change the password for the compromised account.', 45, 0, '2025-02-20 21:42:38', '2025-02-20 21:48:00', NULL),
(27, 7, 'I check recent activity on the account to see what information might have been accessed.', 25, 0, '2025-02-20 21:42:47', '2025-02-20 21:48:11', NULL),
(28, 7, 'I do nothing unless I notice clear signs of unauthorized activity.', 75, 0, '2025-02-20 21:48:24', '2025-02-20 21:48:24', NULL),
(29, 8, 'Never or less than once a year', 60, 0, '2025-02-20 21:50:23', '2025-02-20 21:58:11', NULL),
(30, 8, 'Yearly', 18, 0, '2025-02-20 21:50:38', '2025-02-20 21:58:22', NULL),
(33, 8, 'Every 6 months', 10, 0, '2025-02-20 21:58:33', '2025-02-20 21:58:33', NULL),
(34, 8, 'Every 3 months', 6, 0, '2025-02-20 21:58:40', '2025-02-20 21:58:40', NULL),
(35, 8, 'Monthly or more frequently', 3, 1, '2025-02-20 21:58:51', '2025-02-20 21:58:51', NULL),
(36, 8, 'Only when I suspect a security breach', 13, 0, '2025-02-20 21:58:59', '2025-02-20 21:58:59', NULL),
(37, 9, 'A type of fishing.', 40, 0, '2025-02-20 22:08:42', '2025-02-20 22:08:42', NULL),
(38, 9, 'A deceptive attempt to obtain sensitive information.', 10, 1, '2025-02-20 22:08:53', '2025-02-20 22:09:38', NULL),
(39, 9, 'A type of computer virus that steals your information.', 30, 0, '2025-02-20 22:10:17', '2025-02-20 22:10:17', NULL),
(40, 9, 'A scam that involves sending fake invoices or bills.', 20, 0, '2025-02-20 22:10:23', '2025-02-20 22:10:23', NULL),
(41, 10, 'Click the link in the email immediately to update your information.', 90, 0, '2025-02-20 22:13:09', '2025-02-20 22:13:09', NULL),
(42, 10, 'Carefully examine the email for any obvious signs of phishing, like misspellings or an unusual sender address.', 30, 0, '2025-02-20 22:13:28', '2025-02-20 22:13:28', NULL),
(43, 10, 'Contact the company directly through a known and trusted method (e.g., their official website or phone number) to verify the email\'s legitimacy.', 5, 1, '2025-02-20 22:13:39', '2025-02-20 22:13:51', NULL),
(44, 10, 'Click the link, but be very cautious about what information you provide on the website.', 40, 0, '2025-02-20 22:13:47', '2025-02-20 22:13:47', NULL),
(45, 11, 'Urgent or threatening language.', 25, 0, '2025-02-20 22:16:01', '2025-02-20 22:16:01', NULL),
(46, 11, 'Spelling and grammatical errors.', 20, 0, '2025-02-20 22:16:09', '2025-02-20 22:16:09', NULL),
(47, 11, 'A request for personal information.', 30, 0, '2025-02-20 22:16:17', '2025-02-20 22:16:17', NULL),
(48, 11, 'A link to a fake website that looks like the real thing.', 20, 0, '2025-02-20 22:16:26', '2025-02-20 22:16:26', NULL),
(49, 11, 'Any combination of listed options.', 5, 1, '2025-02-20 22:16:52', '2025-02-20 22:16:52', NULL),
(50, 12, 'Click the link to see where it goes, but be careful.', 70, 0, '2025-02-20 22:25:55', '2025-02-20 22:25:55', NULL),
(51, 12, 'Hover your mouse over the link (without clicking) to see the actual URL.', 10, 0, '2025-02-20 22:26:02', '2025-02-20 22:26:02', NULL),
(52, 12, 'Forward the email to a cybersecurity expert or your IT department.', 5, 1, '2025-02-20 22:26:12', '2025-02-20 22:26:12', NULL),
(53, 12, 'Try to open the website in a new incognito/private browsing window.', 35, 0, '2025-02-20 22:26:19', '2025-02-20 22:26:19', NULL),
(54, 13, 'Phishing conducted through voice calls or phone scams.', 5, 1, '2025-02-20 22:30:11', '2025-02-20 22:42:35', NULL),
(55, 13, 'A type of malware that infects your phone.', 30, 0, '2025-02-20 22:30:18', '2025-02-20 22:42:46', NULL),
(56, 13, 'A social engineering tactic that manipulates people into clicking malicious links or downloading infected files.', 20, 0, '2025-02-20 22:30:25', '2025-02-20 22:42:58', NULL),
(57, 13, 'A legitimate business practice used to verify customer information.', 25, 0, '2025-02-20 22:30:31', '2025-02-20 22:43:07', NULL),
(58, 13, 'A method of encrypting phone calls.', 50, 0, '2025-02-20 22:30:39', '2025-02-20 22:30:39', NULL),
(59, 14, 'Accept the request without further consideration.', 60, 0, '2025-02-20 22:46:33', '2025-02-20 22:46:33', NULL),
(60, 14, 'Ignore or decline the request.', 10, 1, '2025-02-20 22:46:54', '2025-02-20 22:52:56', NULL),
(61, 14, 'Check their profile carefully for red flags, like a lack of profile picture, very few friends, or suspicious posts.', 20, 0, '2025-02-20 22:47:01', '2025-02-20 22:52:31', NULL),
(62, 14, 'Message them politely to ask how you know them before deciding.', 35, 0, '2025-02-20 22:47:08', '2025-02-20 22:52:52', NULL),
(63, 15, 'Click the \"Download Now\" button to install the software.', 70, 0, '2025-02-20 22:58:33', '2025-02-20 22:58:33', NULL),
(64, 15, 'Close the pop-up window without clicking inside it and navigate away from the website.', 5, 1, '2025-02-20 22:58:40', '2025-02-20 22:58:40', NULL),
(65, 15, 'Search online for the name of the \"security software\" mentioned in the pop-up before taking any other action.', 15, 0, '2025-02-20 22:58:48', '2025-02-20 22:58:48', NULL),
(66, 15, 'Try to close the pop-up window by clicking the \"X\" or \"Close\" button.', 35, 0, '2025-02-20 22:58:56', '2025-02-20 22:58:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `authors` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_extension` varchar(255) DEFAULT NULL,
  `published` tinyint(1) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `category_id`, `title`, `subtitle`, `authors`, `url`, `image`, `image_extension`, `published`, `content`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'Law Title', 'Law Subtitle', 'Ben,Aidan', 'https://law.com', '/images/articles/bc6cba14-91c5-405c-8f5e-356f26ac9c7a.png', '.png', 1, 'This is Law.\n\nLaw is good.', '2025-02-20 23:05:35', '2025-02-20 23:05:35', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `attempts`
--

CREATE TABLE `attempts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `quiz_id` bigint(20) UNSIGNED NOT NULL,
  `question_number` int(11) NOT NULL,
  `question_correct` int(11) NOT NULL,
  `vulnerability_rate` int(11) NOT NULL,
  `completed` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attempts`
--

INSERT INTO `attempts` (`id`, `user_id`, `quiz_id`, `question_number`, `question_correct`, `vulnerability_rate`, `completed`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, 1, 0, 0, 0, 0, '2025-02-20 23:29:40', '2025-02-20 23:29:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `attempt_questions`
--

CREATE TABLE `attempt_questions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `attempt_id` bigint(20) UNSIGNED NOT NULL,
  `question_id` bigint(20) UNSIGNED NOT NULL,
  `selected_answer` bigint(20) UNSIGNED NOT NULL,
  `best_answer` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attempt_questions`
--

INSERT INTO `attempt_questions` (`id`, `attempt_id`, `question_id`, `selected_answer`, `best_answer`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, 2, 2, '2025-02-20 23:29:47', '2025-02-20 23:29:47', NULL),
(2, 1, 2, 5, 6, '2025-02-20 23:30:06', '2025-02-20 23:30:06', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Law', 'Law', '2025-02-20 18:50:57', '2025-02-20 18:50:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quiz_id` bigint(20) UNSIGNED NOT NULL,
  `question_text` longtext NOT NULL,
  `feedback` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `quiz_id`, `question_text`, `feedback`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'You receive an email claiming your bank account has been compromised and asking you to click a link to verify your details. What do you do?', 'This question tests your ability to recognize and respond to phishing attempts. Be extremely cautious of emails claiming urgent account issues and requesting personal information or login credentials. Clicking links in such emails is highly risky, as they often lead to fake websites designed to steal your information. Replying to the email is also risky, as it confirms your email address to the sender and can lead to further phishing attempts. While forwarding the email to your bank\'s security department is a good step, it\'s not as effective as directly contacting your bank. The safest course of action is to call your bank directly using a known, trusted number to verify the email\'s legitimacy. Legitimate banks will never request sensitive information via email in this manner.', '2025-02-20 21:13:39', '2025-02-21 00:41:01', NULL),
(2, 1, 'Someone calls you claiming to be from your IT department and needs your password to fix a system issue. What do you do?', 'This question tests your understanding of social engineering and security best practices. Never give your password to anyone over the phone, even if they claim to be from IT. IT professionals will never ask for your password. Asking for their employee ID and then calling the IT department directly using a known, trusted number is the safest way to verify their identity. Telling them you\'ll call them back is a good step, but it\'s crucial to call the official IT number yourself, not the number they provide. Relying on security questions is not a reliable verification method, as scammers can often guess or research the answers. Remember, legitimate IT support will never ask for your password.', '2025-02-20 21:16:29', '2025-02-20 23:55:44', NULL),
(3, 1, 'You find a USB drive in the parking lot of your workplace. What is the safest course of action?', 'This question tests your understanding of the risks associated with found USB drives. Plugging an unknown USB drive into any computer, even one not connected to your network, poses a significant security risk. Malware can be programmed to execute even without a network connection. Trying to find the owner by checking the files is also risky, as you could inadvertently execute malware or expose sensitive data. The safest course of action is to turn the drive in to your IT department or security team. They have the expertise and resources to handle the situation safely. Remember, never plug an unknown USB drive into any computer you value.', '2025-02-20 21:24:30', '2025-02-20 23:58:21', NULL),
(4, 1, 'You receive a message on social media from a \"friend\" asking for your phone number to send you a \"special offer.\" What should you do?', 'This question tests your awareness of social media scams. Be cautious of requests for personal information, even from \"friends.\" Social media accounts can be compromised. Providing your phone number without verification can lead to spam, phishing, or even identity theft. Asking personal questions is not a reliable verification method, as scammers can often find answers online. Asking about the offer is also risky and unlikely to reveal a scammer. The safest course of action is to contact your friend through a different channel (e.g., a phone call) to verify the request. Remember, if something seems suspicious, it probably is.', '2025-02-20 21:28:52', '2025-02-21 00:00:52', NULL),
(5, 1, 'Which of the following best describes your approach to password security?', 'This question explores your password security practices. Using a unique, strong password for every account, generated and stored by a password manager, is the safest and most recommended approach. Using a few different passwords across multiple accounts, while better than reusing the same password, still carries risk. Using the same password for all or most of your accounts is extremely risky, as compromising one account can expose all others. Creating easily memorable passwords using personal information or common words is also risky, as these can be easily guessed or cracked.', '2025-02-20 21:32:31', '2025-02-21 00:15:02', NULL),
(6, 1, 'Which of the following is the strongest password?', 'This question tests your understanding of password strength. While \"ASafePassword\" might seem strong due to its length and capitalization, it\'s ultimately vulnerable because it\'s based on common words and lacks sufficient complexity. \"x%4#qR1!z9pL\" is the strongest option because it\'s long, random, and contains a mix of uppercase and lowercase letters, numbers, and symbols. \"SuperLongPasswordSoNoOneCouldGuessIt\" is long but predictable and lacks character variety, making it less secure. \"P@$$wOrd!\" uses common substitutions and is easily guessable.', '2025-02-20 21:34:03', '2025-02-21 00:41:57', NULL),
(7, 1, 'What do you do if you suspect one of your online accounts has been compromised?', 'This question explores your response to a potential account compromise. Acting quickly and decisively is crucial in limiting the damage. Consider the potential consequences of delayed action, such as identity theft, financial loss, or damage to your reputation. Immediately changing the password for the affected account, and importantly, any other accounts where you used the same password, is the most effective first step. While checking recent activity is a good idea to understand the extent of the potential compromise, it shouldn\'t delay your password changes. Waiting to see if anything happens can leave you vulnerable.', '2025-02-20 21:42:11', '2025-02-20 21:49:15', NULL),
(8, 1, 'How often should you update your passwords?', 'This question explores your password update habits. Consider the risks associated with using outdated passwords, especially given the frequency of data breaches. Regularly updating your passwords, particularly for sensitive accounts, is crucial for online security. While updating too frequently can be cumbersome, neglecting updates for extended periods significantly increases your vulnerability. Aim for a balance between security and manageability. Updating passwords every 3 to 6 months, with more frequent changes for critical accounts, is a good general guideline.', '2025-02-20 21:50:11', '2025-02-20 22:00:46', NULL),
(9, 1, 'What is \"phishing\"?', 'This question tests your understanding of phishing, a common and dangerous social engineering tactic. Phishing attempts try to trick you into revealing sensitive information, like passwords or credit card details, often through deceptive emails, websites, or messages. Recognizing and avoiding phishing scams is essential for protecting yourself online. Consider the various ways phishers might try to deceive you. Being aware of these tactics is your best defense.', '2025-02-20 22:08:30', '2025-02-20 22:09:47', NULL),
(10, 1, 'You receive an email that looks like it\'s from a company you do business with, asking you to update your account information. What is the FIRST thing you should do?', 'This question tests your ability to recognize and respond to potential phishing attempts. Be cautious of unexpected emails requesting personal information, even if they appear legitimate. Verifying the email\'s legitimacy before taking any action is crucial. Directly contacting the supposed sender through a known and trusted channel, such as their official website or phone number, is the safest approach. This avoids the risk of clicking on malicious links or providing information to scammers. Remember, legitimate organizations rarely request sensitive information via email.', '2025-02-20 22:11:20', '2025-02-20 22:14:15', NULL),
(11, 1, 'A phishing email might contain:', 'This question tests your knowledge of common phishing email characteristics. Phishing emails often use various tactics to trick you, including creating a sense of urgency, containing errors, requesting personal information, and directing you to fake websites. Recognizing these red flags is crucial for identifying and avoiding phishing scams. Being aware of these indicators is your best defense against these attacks.', '2025-02-20 22:15:47', '2025-02-20 22:15:47', NULL),
(12, 1, 'You receive an email with a link that looks suspicious. What should you do?', 'This question tests your ability to handle suspicious links, a common element of phishing attacks. Be extremely cautious about clicking on links in emails, especially if they seem unusual or unexpected. While hovering your mouse over the link (without clicking) to preview the actual URL can be a helpful first step, it is not foolproof as attackers can disguise malicious links. Opening the link in an incognito or private browsing window does not provide additional security against phishing and can still expose you to risk. Forwarding the email to a cybersecurity expert or your IT department is a good action, but should not replace caution and verification. Remember, it is always better to err on the side of caution when dealing with suspicious links.', '2025-02-20 22:18:19', '2025-02-21 00:28:17', NULL),
(13, 1, 'What is \"vishing\"?', 'This question tests your understanding of vishing, a type of social engineering attack. Vishing uses phone calls or voice messages to trick you into revealing personal information, such as passwords, bank details, or other sensitive data. It\'s a form of phishing that relies on voice communication rather than emails or websites. It is not malware, a legitimate business practice (though legitimate businesses do verify information), or a method of encrypting phone calls. Be cautious of unsolicited calls requesting personal information. Legitimate organizations rarely request sensitive data over the phone.', '2025-02-20 22:28:12', '2025-02-20 22:44:14', NULL),
(14, 1, 'You receive a friend request from someone you do not know on social media. What should you do?', 'This question explores your approach to social media safety. Be cautious when receiving friend requests from strangers. Accepting requests without careful consideration can expose you to various risks, including scams, phishing, and identity theft. While messaging the person politely to inquire about their identity or how you know them is an option, it still involves interaction with a stranger and can carry some risk. Checking the profile red flags is a good step, but it is not foolproof. Ignoring or declining the request is generally the safest option, especially if anything about the profile seems suspicious. Your online connections should be built on trust, not chance.', '2025-02-20 22:46:12', '2025-02-21 00:43:26', NULL),
(15, 1, 'You are browsing the internet and a pop-up window appears, claiming your computer is infected with a virus and urging you to download and install security software immediately. What do you do?', 'This question tests your ability to recognize and respond to online scams. Be extremely cautious of unexpected pop-up windows claiming your computer is infected. Clicking the \'Download Now\' button is highly risky, as these pop-ups are almost always scams designed to trick you into installing malware. Even attempting to close the pop-up by clicking the \'X\' or \'Close\' button can be risky, as many are designed to trigger downloads. Searching online for the software before taking any action is a slightly safer approach, but you should still be extremely wary, as scammers often create fake review sites. The safest course of action is to close the pop-up window without clicking inside it and navigate away from the website. Remember, legitimate security software will never be distributed through such pop-ups. Reflecting on these points will help you avoid falling victim to online scams.', '2025-02-20 22:58:19', '2025-02-20 22:58:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`id`, `name`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Social Engineering', 'Social Engineering, this quiz is for educational purpose only.', '2025-02-20 19:07:02', '2025-02-20 23:33:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role` int(11) NOT NULL DEFAULT 2,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `last_attempt` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `username`, `password`, `firstname`, `lastname`, `dob`, `active`, `last_attempt`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'admin@gmail.com', '$2b$10$m9lgkVkUiWoz8/edVn4gw.ONY268MtubE3XfR09skRpjIoIjx09CK', 'Admin', NULL, NULL, 1, NULL, '2025-02-20 19:02:49', '2025-02-20 19:02:49', NULL),
(2, 2, 'eldon@gmail.com', '$2b$10$m9lgkVkUiWoz8/edVn4gw.ONY268MtubE3XfR09skRpjIoIjx09CK', 'Eldon', 'Yeap', '2000-06-19', 1, '2025-02-20 23:29:40', '2025-02-20 19:02:49', '2025-02-20 23:29:10', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `answers_question_id_foreign` (`question_id`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `articles_category_id_foreign` (`category_id`);

--
-- Indexes for table `attempts`
--
ALTER TABLE `attempts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attempts_user_id_foreign` (`user_id`),
  ADD KEY `attempts_quiz_id_foreign` (`quiz_id`);

--
-- Indexes for table `attempt_questions`
--
ALTER TABLE `attempt_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attempt_questions_attempt_id_foreign` (`attempt_id`),
  ADD KEY `attempt_questions_question_id_foreign` (`question_id`),
  ADD KEY `attempt_questions_selected_answer_foreign` (`selected_answer`),
  ADD KEY `attempt_questions_best_answer_foreign` (`best_answer`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questions_quiz_id_foreign` (`quiz_id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attempts`
--
ALTER TABLE `attempts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attempt_questions`
--
ALTER TABLE `attempt_questions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `attempts`
--
ALTER TABLE `attempts`
  ADD CONSTRAINT `attempts_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`),
  ADD CONSTRAINT `attempts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `attempt_questions`
--
ALTER TABLE `attempt_questions`
  ADD CONSTRAINT `attempt_questions_attempt_id_foreign` FOREIGN KEY (`attempt_id`) REFERENCES `attempts` (`id`),
  ADD CONSTRAINT `attempt_questions_best_answer_foreign` FOREIGN KEY (`best_answer`) REFERENCES `answers` (`id`),
  ADD CONSTRAINT `attempt_questions_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `attempt_questions_selected_answer_foreign` FOREIGN KEY (`selected_answer`) REFERENCES `answers` (`id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
